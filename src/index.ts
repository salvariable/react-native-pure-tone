import { NativeModules, Platform } from 'react-native';

const { AudioModule } = NativeModules;

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export type PlayToneParams = {
  frequency: number;
  duration?: number; // in seconds
  waveform?: WaveType;
};

export function playTone({ frequency, duration = 1.5, waveform = 'sine' }: PlayToneParams): void {
  if (!frequency) {
    console.warn('[pure-tone] Missing frequency');
    return;
  }

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (typeof AudioModule?.playToneWithWave === 'function') {
      AudioModule.playToneWithWave(frequency, duration * 1000, waveform);
    } else {
      console.warn('[pure-tone] Native module unavailable or not supported on this platform.');
    }
  } else if (Platform.OS === 'web') {
    playToneWeb(frequency, duration * 1000, waveform);
  } else {
    console.warn('[pure-tone] Unsupported platform.');
  }
}

function playToneWeb(freq: number, durationMs: number, wave: WaveType): void {
  const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const context = new AudioContextClass();

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(freq, context.currentTime);
  gainNode.gain.setValueAtTime(0.2, context.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + durationMs / 1000);
}

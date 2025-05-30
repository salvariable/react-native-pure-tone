import { NativeModules, Platform } from 'react-native';

const { AudioModule } = NativeModules;

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

type PlayToneParams = {
  frequency: number;
  duration?: number; // in seconds
  waveform?: WaveType;
};

export function playTone({ frequency, duration = 0.5, waveform = 'sine' }: PlayToneParams): void {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const durationMs = duration * 1000;
    AudioModule?.playToneWithWave?.(frequency, durationMs, waveform);
  } else if (Platform.OS === 'web') {
    playToneWeb(frequency, duration, waveform);
  } else {
    console.warn('[pure-tone] Platform not supported.');
  }
}

function playToneWeb(freq: number, duration: number, wave: WaveType): void {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const context = new AudioContextClass();

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(freq, context.currentTime);
  gainNode.gain.setValueAtTime(0.2, context.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

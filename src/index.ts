import { NativeModules, Platform } from 'react-native';

const { AudioModule } = NativeModules;

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export type PlayToneParams = {
  frequency: number;
  duration?: number; // in seconds
  waveform?: WaveType;
};

export function playTone(input: PlayToneParams | PlayToneParams[]): void {
  const duration = (note: PlayToneParams) => note.duration ?? 1.5;
  const waveform = (note: PlayToneParams) => note.waveform ?? 'sine';

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (Array.isArray(input)) {
      for (const note of input) {
        AudioModule?.playToneWithWave(note.frequency, duration(note) * 1000, waveform(note));
      }
    } else {
      AudioModule?.playToneWithWave(input.frequency, duration(input) * 1000, waveform(input));
    }
  } else if (Platform.OS === 'web') {
    if (Array.isArray(input)) {
      for (const note of input) {
        playToneWeb(note.frequency, duration(note) * 1000, waveform(note));
      }
    } else {
      playToneWeb(input.frequency, duration(input) * 1000, waveform(input));
    }
  } else {
    console.warn('[pure-tone] Unsupported platform or missing native module.');
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

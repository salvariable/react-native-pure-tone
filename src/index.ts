import { NativeModules, Platform } from 'react-native';

const { AudioModule } = NativeModules;

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export function playTone(freq: number, durationMs = 500, wave: WaveType = 'sine'): void {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    AudioModule.playToneWithWave(freq, durationMs, wave);
  } else if (Platform.OS === 'web') {
    playToneWeb(freq, durationMs, wave);
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

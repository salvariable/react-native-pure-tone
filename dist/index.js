import { NativeModules, Platform } from 'react-native';
const { AudioModule } = NativeModules;
export function playTone(input) {
    const duration = (note) => note.duration ?? 1.5;
    const waveform = (note) => note.waveform ?? 'sine';
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        if (Array.isArray(input)) {
            for (const note of input) {
                AudioModule?.playToneWithWave(note.frequency, duration(note) * 1000, waveform(note));
            }
        }
        else {
            AudioModule?.playToneWithWave(input.frequency, duration(input) * 1000, waveform(input));
        }
    }
    else if (Platform.OS === 'web') {
        if (Array.isArray(input)) {
            for (const note of input) {
                playToneWeb(note.frequency, duration(note) * 1000, waveform(note));
            }
        }
        else {
            playToneWeb(input.frequency, duration(input) * 1000, waveform(input));
        }
    }
    else {
        console.warn('[pure-tone] Unsupported platform or missing native module.');
    }
}
function playToneWeb(freq, durationMs, wave) {
    const AudioContextClass = (window.AudioContext || window.webkitAudioContext);
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

import { NativeModules, Platform } from 'react-native';
const { AudioModule } = NativeModules;
export function playTone(freq, durationMs = 500, wave = 'sine') {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        AudioModule.playToneWithWave(freq, durationMs, wave);
    }
    else if (Platform.OS === 'web') {
        playToneWeb(freq, durationMs, wave);
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

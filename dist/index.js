import { NativeModules, Platform } from 'react-native';
const { AudioModule } = NativeModules;
export function playTone(freq, durationMs = 500, wave = 'sine') {
    if (Platform.OS === 'web') {
        playToneWeb(freq, durationMs, wave);
        return;
    }
    try {
        AudioModule?.playToneWithWave(freq, durationMs, wave);
    }
    catch (error) {
        console.warn('[pure-tone] Native module unavailable or failed to call playToneWithWave:', error);
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

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';
type PlayToneParams = {
    frequency: number;
    duration?: number;
    waveform?: WaveType;
};
export declare function playTone({ frequency, duration, waveform }: PlayToneParams): void;
export {};

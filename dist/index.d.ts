export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';
export declare function playTone(freq: number, durationMs?: number, wave?: WaveType): void;

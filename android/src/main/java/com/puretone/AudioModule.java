package com.puretone;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AudioModule extends ReactContextBaseJavaModule {

    public AudioModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AudioModule";
    }

@ReactMethod
public void playToneWithWave(double freq, int durationMs, String wave) {
    final int sampleRate = 44100;
    int count = (int)((durationMs / 1000.0) * sampleRate);
    short[] samples = new short[count];

    for (int i = 0; i < count; i++) {
        double t = (double)i / sampleRate;
        double angle = 2.0 * Math.PI * freq * t;
        double value;

        switch (wave) {
            case "square":
                value = Math.sin(angle) >= 0 ? 1.0 : -1.0;
                break;
            case "triangle":
                value = 2.0 * Math.abs(2.0 * (freq * t - Math.floor(freq * t + 0.5))) - 1.0;
                break;
            case "sawtooth":
                value = 2.0 * (freq * t - Math.floor(freq * t + 0.5));
                break;
            default:
                value = Math.sin(angle);
        }

        samples[i] = (short)(value * Short.MAX_VALUE * 0.2);
    }

    AudioTrack audioTrack = new AudioTrack(AudioManager.STREAM_MUSIC,
            sampleRate, AudioFormat.CHANNEL_OUT_MONO,
            AudioFormat.ENCODING_PCM_16BIT, samples.length * 2,
            AudioTrack.MODE_STATIC);

    audioTrack.write(samples, 0, samples.length);
    audioTrack.play();
}
}

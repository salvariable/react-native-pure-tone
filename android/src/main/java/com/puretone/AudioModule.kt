package com.puretone

import android.media.AudioFormat
import android.media.AudioManager
import android.media.AudioTrack
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AudioModule"
    }

    @ReactMethod
    fun playToneWithWave(frequency: Double, durationMs: Int, waveType: String) {
        val sampleRate = 44100
        val count = (sampleRate * (durationMs / 1000.0)).toInt()
        val buffer = ShortArray(count)

        for (i in 0 until count) {
            val t = i.toDouble() / sampleRate
            val sample = when (waveType) {
                "square" -> if (Math.sin(2.0 * Math.PI * frequency * t) > 0) 1.0 else -1.0
                "triangle" -> 2 / Math.PI * Math.asin(Math.sin(2.0 * Math.PI * frequency * t))
                "sawtooth" -> 2 * (t * frequency - Math.floor(t * frequency + 0.5))
                else -> Math.sin(2.0 * Math.PI * frequency * t) // default: sine
            }
            buffer[i] = (sample * Short.MAX_VALUE).toInt().toShort()
        }

        val audioTrack = AudioTrack(
            AudioManager.STREAM_MUSIC,
            sampleRate,
            AudioFormat.CHANNEL_OUT_MONO,
            AudioFormat.ENCODING_PCM_16BIT,
            buffer.size * 2,
            AudioTrack.MODE_STATIC
        )

        audioTrack.write(buffer, 0, buffer.size)
        audioTrack.play()
    }
}

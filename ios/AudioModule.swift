import AVFoundation

@objc(AudioModule)
class AudioModule: NSObject {

  var engine = AVAudioEngine()
  var playerNode = AVAudioPlayerNode()

  @objc func playToneWithWave(_ freq: Double, durationMs: Int, wave: NSString) {
    let sampleRate = 44100.0
    let length = AVAudioFrameCount(sampleRate * Double(durationMs) / 1000.0)
    let format = AVAudioFormat(standardFormatWithSampleRate: sampleRate, channels: 1)!
    let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: length)!
    buffer.frameLength = length

    let samples = buffer.floatChannelData![0]
    let waveType = wave as String

    for i in 0..<Int(length) {
      let t = Double(i) / sampleRate
      let angle = 2.0 * Double.pi * freq * t
      let value: Float

      switch waveType {
      case "square":
        value = sin(angle) >= 0 ? 1.0 : -1.0
      case "triangle":
        value = Float(2.0 * abs(2.0 * (freq * t - floor(freq * t + 0.5))) - 1.0)
      case "sawtooth":
        value = Float(2.0 * (freq * t - floor(freq * t + 0.5)))
      default:
        value = Float(sin(angle))
      }

      samples[i] = value * 0.2 // volumen controlado
    }

    engine = AVAudioEngine()
    playerNode = AVAudioPlayerNode()
    engine.attach(playerNode)
    engine.connect(playerNode, to: engine.mainMixerNode, format: format)
    
    try? engine.start()
    playerNode.scheduleBuffer(buffer, at: nil, options: .interrupts, completionHandler: nil)
    playerNode.play()
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

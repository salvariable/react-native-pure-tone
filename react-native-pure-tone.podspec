require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-pure-tone"
  s.version      = package["version"]
  s.summary      = "Cross-platform tone generator"
  s.description  = "Generate pure tones with configurable frequency and waveform in React Native."
  s.homepage     = "https://github.com/tuusuario/react-native-pure-tone"
  s.license      = package["license"]
  s.author       = { "Salvador Bolanos" => "salvariable@icloud.com" }
  s.source       = { :git => "https://github.com/tuusuario/react-native-pure-tone.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,m,swift}"
  s.platform     = :ios, "12.0"
  s.requires_arc = true
end

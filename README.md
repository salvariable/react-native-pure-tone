
# 🎧 react-native-pure-tone

Generate pure tones with configurable frequency and waveform in **React Native and Expo** — fully compatible with **Android**, **iOS**, and **Web**.

Ideal for educational apps, sound experiments, or musical tools. This module synthesizes audio **in real-time**, directly from native or web audio engines — **no .mp3 files required**.

---

## 🚀 Features

- ✅ Cross-platform: **Android, iOS, Web**
- 📐 Custom frequency input (e.g. 440Hz for A4)
- 🌊 Selectable waveform: `sine`, `square`, `triangle`, `sawtooth`
- 🎹 Multi-tone support (chords!)
- ⚙️ Native modules for high-performance audio
- 🔧 Works with **React Native CLI** and **Expo Dev Client**

---

## ⚠️ Requirements

- `react-native >= 0.72`
- `expo >= 50` *(if using Expo)*
- ❌ **Not compatible with Expo Go**

> You must use a **custom Dev Client** (via `expo run:ios` or `expo run:android`) because this library includes native code.

---

## 📦 Installation

```bash
npm install react-native-pure-tone
```

### For Expo users:

```bash
npx expo install
npx expo run:android
# or
npx expo run:ios
```

---

## 🧪 Usage

```ts
import { playTone } from 'react-native-pure-tone';

playTone({
  frequency: 440, // A4 note
  duration: 1.5,  // seconds
  waveform: 'sine' // 'square', 'triangle', or 'sawtooth'
});
```

---

## 🎵 Play Chords

```ts
playTone([
  { frequency: 440 },       // A4
  { frequency: 554.37 },    // C#5
  { frequency: 659.25 }     // E5
]);
```

---

## 🧭 Roadmap

- [x] Cross-platform tone playback
- [x] Native Swift/Java modules
- [x] Waveform selection
- [ ] ADSR envelope support
- [ ] MIDI input / on-screen keyboard
- [ ] Waveform visualizer

---

## 🙌 Contributions

Pull requests are welcome!  
Help us shape the first fully-native audio synthesis module for the React Native ecosystem.

---

## 💡 Why not `expo-av` or `.mp3` files?

Because this is not just a player.  
**This module synthesizes sound from scratch**, enabling real-time tuning, interactivity, and true instrument-like behavior — all without external assets.

---

## 🪪 License

MIT © 2025 [Salvador Bolanos (Salvariable)](https://github.com/salvariable)

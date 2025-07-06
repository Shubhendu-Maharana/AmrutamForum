# AmrutamForum

**AmrutamForum** is a React Native application designed for building a discussion forum experience on mobile platforms. It was bootstrapped using the official `@react-native-community/cli` and leverages Expo-compatible tooling for cross-platform development.

---

## 🚀 Table of Contents

* [Features](#features)
* [Demo](#demo)
* [Prerequisites](#prerequisites)
* [Installation & Running Locally](#installation--running-locally)
* [Code Structure](#code-structure)
* [Usage Tips](#usage-tips)
* [Acknowledgements](#acknowledgements)

---

## Features

* 🗣️ **Threaded Discussions** — Create, reply, and browse topics and comments.
* 📱 **Cross-Platform Support** — Run smoothly on both Android and iOS devices.
* ⚙️ **Live Reload** — Powered by Fast Refresh for an enhanced development experience.
* 🔧 **Modular Architecture** — Designed to scale with features like authentication, moderation, and more.

---

## Demo

> ⚠️ *Add screenshots or a short Gif/clip to showcase key screens — Home feed, thread view, posting a comment, etc.*

---

## Prerequisites

Before getting started, ensure you have:

* Node.js (14.x or higher recommended)
* npm or Yarn
* **Android**: Android Studio + SDK and emulator OR a connected device
* **iOS**: Xcode + iOS Simulator (macOS only) + CocoaPods (`gem install cocoapods`)

Also, follow the official React Native environment setup: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

---

## Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shubhendu-Maharana/AmrutamForum.git
   cd AmrutamForum
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Metro bundler**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Launch on Android**

   ```bash
   npm run android
   # or
   yarn android
   ```

5. **Launch on iOS** (macOS only)

   ```bash
   cd ios
   bundle install      # for CocoaPods
   bundle exec pod install
   cd ..
   npm run ios
   # or
   yarn ios
   ```

You're now up and running! 🎉

---

## Code Structure

```text
AmrutamForum/
├─ src/
│   ├── components/   # Reusable UI components
|   ├── context/      # React Context for global state management
|   ├── data/         # Static or mock data (e.g., JSON files, constants)
|   ├── navigation/   # Navigation configuration (stack/tab navigators)
|   ├── screens/      # Main application screens (Home, Forum, Post, etc.)
|   ├── types/        # TypeScript type definitions and interfaces
|   ├─ App.tsx        # App entry point and navigation container
├─ package.json
└─ README.md
```

---

## Usage Tips

* **Fast Refresh**: Automatically updates your view as you edit components.
* **Manual Reload**:

  * Android: Double-press `R` or access Developer Menu
  * iOS: Press `R` in the Simulator
* **Adding Dependencies**:
  Add native modules, then re-run `pod install` (iOS) and restart Metro.
* **Debugging**:
  Use React DevTools and Redux DevTools (if integrated), or debug via Chrome debugger.

---

## Acknowledgements

* Bootstrapped with [React Native CLI](https://github.com/react-native-community/cli)
* Fast Refresh powered by React Native
* Inspired by modern forum-style apps and community feedback

---

### Need Help?

Have questions or want to contribute? Feel free to raise an issue or reach out—happy to help!

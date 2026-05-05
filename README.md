# 🛠️ RozgarHub

> A React Native mobile app connecting **daily wage and blue-collar workers** with local job opportunities — built for the Indian workforce.

![React Native](https://img.shields.io/badge/React_Native-0.84.1-61DAFB?style=flat&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth_+_Firestore-FFCA28?style=flat&logo=firebase)
![Platform](https://img.shields.io/badge/Platform-Android_|_iOS-green?style=flat)
![Status](https://img.shields.io/badge/Status-MVP-orange?style=flat)

---

## 💡 Why RozgarHub?

India has over 450 million blue-collar workers, yet most job discovery still happens through word-of-mouth or physical labour markets. There is no simple, accessible digital platform built specifically for daily wage workers — most job apps assume literacy in English, access to the internet, and comfort with technology.

RozgarHub solves this by providing a **phone-first, vernacular-friendly platform** where workers can find local jobs in minutes, and employers can hire verified workers without middlemen.

---

## 📱 About

RozgarHub is a mobile-first job platform designed to bridge the gap between **employers** and **blue-collar workers** such as electricians, plumbers, carpenters, construction workers, and more.

The app provides a simple, accessible experience for workers — with Firebase phone OTP login, location-based job discovery, multi-language support, and a real-time job tracking dashboard.

---

## ✨ Features

### 👷 For Workers
- 📲 **Phone OTP authentication** — powered by Firebase Auth, no email or password needed
- 🗺️ **Location-based onboarding** — detects the worker's area using device GPS
- 🧰 **Work type selection** — choose your trade (construction, plumbing, electrical, etc.)
- 🔍 **Job discovery feed** — browse nearby jobs with pay, duration, and timing details
- ✅ **Accept & track jobs** — view ongoing jobs with live status badges and progress tracker
- ⭐ **Post-job ratings** — rate your experience with star ratings and experience tags

### 🏢 For Employers
- 📋 **Post job listings** — specify role, location, skills, pay, and timing
- 👥 **Browse & shortlist workers** — view worker profiles with ratings and experience
- 📊 **Dashboard** — track active, completed, and pending jobs at a glance

### 🌐 Multi-language Support
- Built-in `TranslationContext` for regional language support — making the app accessible to non-English speaking workers

---

## ⚙️ Key Technical Highlights

- **Centralized styling system** — a single `commonStyles.js` StyleSheet shared across all screens, making the UI consistent and easy to maintain at scale
- **Context API for global state** — `UserContext` and `TranslationContext` manage user session and language preferences app-wide without any third-party state library
- **Firebase phone auth flow** — OTP-based login with no email/password, reducing friction for low-literacy users
- **Real-time Firestore integration** — job listings, worker profiles, and job status updates are synced live using Firebase Firestore
- **GPS-based onboarding** — uses `react-native-geolocation-service` to auto-detect worker location on first launch
- **Role-based navigation** — separate flows for workers and employers managed through React Navigation stack + bottom tabs

---

## 🖼️ Screens

| Screen | Description |
|--------|-------------|
| **Welcome / Login** | Phone number input, OTP verification via Firebase |
| **Onboarding** | Location detection, age selection, work type grid |
| **Home Dashboard** | Stats cards, quick actions, ongoing job feed |
| **Job Listing** | Job cards with pay, location, skills, timing |
| **Job Detail & Tracking** | Status badges, progress tracker, mark as done |
| **Worker Profile** | Avatar, skills, experience, overall rating |
| **Reviews** | Star breakdown, per-review cards with client info |
| **Rate Worker** | Star rating + experience tag selection |

---

## 🚀 Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites
- Node.js >= 20
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)
- A Firebase project with **Authentication** (Phone) and **Firestore** enabled

### Installation

```sh
# Clone the repository
git clone https://github.com/Swasti-Bansal/RozgarHub.git
cd RozgarHub

# Install dependencies
npm install
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Phone Authentication** under Auth providers
3. Enable **Cloud Firestore**
4. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) and place them in the respective native folders

### Step 1: Start Metro

```sh
npm start
```

### Step 2: Run the App

#### Android
```sh
npm run android
```

#### iOS

```sh
bundle install
bundle exec pod install
npm run ios
```

---

## 🏗️ Project Structure

```
RozgarHub/
├── src/
│   ├── context/
│   │   ├── UserContext.js         # Global user state
│   │   └── TranslationContext.js  # Multi-language support
│   ├── navigation/
│   │   └── AppNavigator.js        # React Navigation stack + bottom tabs
│   ├── screens/                   # All app screens
│   └── styles/
│       └── commonStyles.js        # Centralized StyleSheet for the entire app
├── App.jsx                        # Root component
├── index.js
└── package.json
```

---

## 🛠️ Tech Stack

| Tech | Version | Usage |
|------|---------|-------|
| React Native | 0.84.1 | Cross-platform mobile framework |
| React | 19.2.3 | UI library |
| React Navigation | 7.x | Stack + Bottom Tab navigation |
| Firebase Auth | 23.x | Phone OTP authentication |
| Firebase Firestore | 23.x | Real-time database |
| react-native-geolocation-service | 5.x | GPS location detection |
| react-native-webview | 13.x | In-app web content |

---

## 👥 Contributors

This project was built as a team of 6. See all contributors here:

[![Contributors](https://contrib.rocks/image?repo=Swasti-Bansal/RozgarHub)](https://github.com/Swasti-Bansal/RozgarHub/graphs/contributors)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *RozgarHub — Connecting hands that build, with work that pays.*

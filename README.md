# Number System Converter - Deployment Guide

## App Overview

A modern, cross-platform Number System Converter application built with React Native and Expo. The app supports conversions between Binary, Octal, Decimal, and Hexadecimal number systems with real-time step-by-step explanations.

### Features
- **Real-time Conversion**: Instant conversions between all major number systems
- **Step-by-Step Explanations**: Detailed breakdown of each conversion process
- **Learn Mode**: Interactive tutorials with multiple conversion methods
- **ASCII Table**: Complete ASCII reference with search functionality
- **Multiple Themes**: Light, Dark, Blue Accent, and High Contrast themes
- **Responsive Design**: Works seamlessly on mobile, tablet, and web
- **Negative Number Support**: Handles negative numbers with two's complement

---

## Platform Support

### ✅ Web (Ready)
The app is fully functional in web browsers and can be accessed via Expo's web build.

**To run locally:**
```bash
npm run dev
```

**For production web build:**
```bash
npm run build:web
```

The web version is accessible through Expo Go or can be deployed to any static hosting service.

---

### 📱 Android (APK Generation)

To build an APK for Android devices:

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure build:**
```bash
eas build:configure
```

4. **Build APK:**
```bash
eas build -p android --profile preview
```

This will generate an APK file that can be downloaded and installed on Android devices.

**Alternative - Development Build:**
For faster testing during development:
```bash
npx expo run:android
```

---

### 🍎 iOS (Expo Go / TestFlight)

**Option 1: Expo Go (Quickest for Testing)**

1. **Start development server:**
```bash
npm run dev
```

2. **Scan QR code** with Expo Go app on your iOS device

**Option 2: Build for TestFlight/App Store**

1. **Build iOS app:**
```bash
eas build -p ios
```

2. **Submit to TestFlight:**
```bash
eas submit -p ios
```

Note: iOS builds require an Apple Developer account ($99/year).

---

## Testing Instructions

### Web Testing
1. Run `npm run dev`
2. Press `w` to open in web browser
3. Test all features:
   - Input various numbers in different formats
   - Switch between number systems
   - Verify step-by-step explanations
   - Test theme switching
   - Explore Learn and ASCII tabs

### Mobile Testing (Expo Go)
1. Install Expo Go from Play Store (Android) or App Store (iOS)
2. Run `npm run dev` in project directory
3. Scan QR code with Expo Go
4. Test all features on your device

---

## Deployment Options

### Web Hosting (Static)

**Netlify:**
```bash
npm run build:web
# Deploy the dist folder to Netlify
```

**Vercel:**
```bash
npm run build:web
# Deploy the dist folder to Vercel
```

**GitHub Pages:**
Add to `app.json`:
```json
{
  "web": {
    "bundler": "metro"
  }
}
```

### Mobile App Stores

**Google Play Store:**
1. Build production APK/AAB: `eas build -p android --profile production`
2. Create Google Play Console account
3. Upload build and submit for review

**Apple App Store:**
1. Build iOS app: `eas build -p ios --profile production`
2. Submit to App Store: `eas submit -p ios`
3. Configure app metadata in App Store Connect

---

## Environment Variables

The app uses the following environment variables (already configured in `.env`):

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

For production deployments, ensure these are set appropriately.

---

## Key Technologies

- **Framework**: React Native + Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet with custom theming
- **Icons**: Lucide React Native
- **Platform Support**: iOS, Android, Web

---

## App Structure

```
app/
├── (tabs)/
│   ├── index.tsx         # Conversion screen (main feature)
│   ├── learn.tsx         # Learning resources
│   ├── ascii.tsx         # ASCII table reference
│   └── theme.tsx         # Theme selector
utils/
├── converter.ts          # Number system conversion logic
├── learnData.ts          # Educational content
└── asciiData.ts          # ASCII table data
contexts/
└── ThemeContext.tsx      # Theme management
```

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run typecheck

# Build for web
npm run build:web

# Build APK for Android
eas build -p android --profile preview

# Build for iOS
eas build -p ios
```

---

## Support & Documentation

- **Expo Documentation**: https://docs.expo.dev/
- **EAS Build Guide**: https://docs.expo.dev/build/introduction/
- **React Native**: https://reactnative.dev/

---



# Number System Converter - Deliverables

## 📱 Platforms & Access

* **Web**: Accessible via Expo Web build (URL provided after deployment).
* **Android**: Downloadable APK file generated via EAS Build.
* **iOS**: Testable using Expo Go QR Code; optional TestFlight distribution.

---

## ✅ Deliverables for Assignment

1. **Process Documentation** (`PROCESS.md`)

   * Describes project development stages from requirements → deployment.

2. **Program Documentation** (`PROGRAM.md`)

   * Explains algorithms, components, and implementation details.

3. **Application Build Outputs:**

   * **Android APK File** – installable on any Android device.
   * **Expo Go QR Code** – for iOS testing.
   * **Web Link** – accessible through browser.

---

## 🛠️ Build Commands

```bash
# Web version
npm run build:web

# Android APK
eas build -p android --profile preview

# iOS (Expo Go QR / TestFlight)
eas build -p ios
```

---

## 👥 Contributors

* Group Members (5 students as required)
* Supervisor/Collaborator: **LLmwai**

---

## 📜 License

This project was built for **SPC 2207 CAT ONE (2025)** as an educational assignment and demonstrates modern mobile app development practices.
It may be reused for academic purposes with attribution.

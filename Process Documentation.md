# Process Documentation - Number System Converter App

## 1. Problem Statement

Students and professionals often struggle with converting between number systems (Binary, Octal, Decimal, Hexadecimal). Manual conversions are time-consuming and error-prone. The goal of this project is to **automate the process** with a modern, cross-platform app that is also educational.

---

## 2. Objectives

* Automate number system conversions.
* Provide **step-by-step explanations** of each conversion.
* Include a **learning module** for theory and multiple conversion methods.
* Support **ASCII reference** and **negative number handling**.
* Make the app cross-platform: **Android, iOS, Web**.
* Provide theme switching for accessibility.

---

## 3. Design Phase

* **User Interface**:

  * Calculator-style layout with input field, two dropdowns (from → to), and result card.
  * Navigation tabs: Conversion, Learn, ASCII, Theme.
* **System Flow**:

  1. User enters a number.
  2. User selects source and target number systems.
  3. System converts and displays result.
  4. Explanation box shows calculation process.
* **Tech Stack**:

  * React Native + Expo (cross-platform).
  * Expo Router for navigation.
  * Tailwind / Styled Components for styling.

---

## 4. Implementation Phase

* **Conversion Logic** written in `utils/converter.ts`.
* **Learn Content** in `utils/learnData.ts` with different conversion methods and hints.
* **ASCII Table** in `utils/asciiData.ts`.
* **Theme Context** to manage Light, Dark, Blue Accent, High Contrast themes.
* **Expo Go** used for rapid development testing.
* **EAS Build** used for generating APK and iOS builds.

---

## 5. Testing Phase

* Tested conversions with known values:

  * Decimal 15 → Binary `1111`
  * Binary `1010` → Decimal `10`
  * Decimal −10 → Binary (two’s complement).
* UI tested on:

  * Android Emulator (Pixel 6).
  * iOS Simulator (iPhone 14).
  * Web Browser (Chrome, Firefox).

---

## 6. Deployment Phase

* **Web**: Exported with Expo Web, deployable to Netlify/Vercel.
* **Android**: Built APK with EAS CLI (`eas build -p android`).
* **iOS**: Expo Go QR code for testing, with option to deploy to TestFlight/App Store.

---

## 7. Conclusion

The process followed a structured **SDLC model**: requirement gathering → design → implementation → testing → deployment. The final product is a fully functional, educational number system converter available on all major platforms.

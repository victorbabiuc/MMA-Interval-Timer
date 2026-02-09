# MMA Interval Timer – iOS (Expo)

Interval timer for MMA, boxing, and workouts. Built with **Expo (React Native)** for iPhone.

## Run on iPhone

1. **Install dependencies**
   ```bash
   cd ios-app
   npm install
   ```

2. **Start Expo**
   ```bash
   npx expo start
   ```

3. **Open on device**
   - Install the **Expo Go** app on your iPhone from the App Store.
   - Scan the QR code from the terminal with your camera (or use the link in the terminal).
   - The app will open in Expo Go.

4. **Or run in iOS Simulator**
   ```bash
   npx expo start --ios
   ```
   (Requires Xcode and an iOS simulator.)

**Not hearing the timer beep?** Turn volume up and silent switch off; first run needs network for the chime. See **SOUNDS.md** for details.

**App Store.** Step-by-step: **APP_STORE_STEPS.md**. Ready-to-paste text (description, keywords, privacy): **APP_STORE_COPY.md**. Screenshots: **SCREENSHOTS.md**. Short checklist: **LAUNCH.md**.

## Project layout

- `App.tsx` – Root app and screen state
- `src/lib/` – Types and presets (shared logic)
- `src/hooks/useTimer.ts` – Timer logic, sound (expo-av), vibration
- `src/screens/` – Home, Config, Active Timer, Completion
- `src/components/` – ProgressRing

## Web version

The original Next.js web app is in **`../web-backup/`**. To run it:

```bash
cd ../web-backup
npm install --legacy-peer-deps
npm run dev
```

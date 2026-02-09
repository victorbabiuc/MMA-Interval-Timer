# App Store launch – Interval Timer (iOS)

Single checklist for building and submitting to the App Store. Use this before and during submit.

---

## 1. App icon (required)

- Add **`assets/icon.png`** — **1024×1024 px**, no transparency, no rounded corners (Apple applies the mask).
- If you don’t have one yet, use any 1024×1024 image as a placeholder so the build succeeds; replace with the final icon before release.
- `app.json` is set to `"icon": "./assets/icon.png"`.

---

## 2. Bundle identifier

- Current: `com.intervaltimer.app`
- To use your own (e.g. `com.yourcompany.intervaltimer`), change it in `app.json` under `expo.ios.bundleIdentifier`. It must be unique and match what you create in App Store Connect.

---

## 3. Build the app (EAS Build)

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in: `eas login` (link to your Apple Developer account when prompted).
3. Configure (first time): `eas build:configure`
4. Build for iOS: `eas build --platform ios --profile production`
5. When the build finishes, download the `.ipa` or use EAS Submit (below).

---

## 4. App Store Connect setup

1. In [App Store Connect](https://appstoreconnect.apple.com), create a new app (e.g. “Interval Timer”).
2. Fill in: **Name**, **Subtitle**, **Description**, **Category** (e.g. Health & Fitness or Sports).
3. **Privacy Policy URL** – Required if you collect user data; for local-only storage a short “We don’t collect personal data” page is enough.
4. **Screenshots** – At least one per required device size (e.g. 6.7", 6.5", 5.5" for iPhone). Use simulator or device.
5. **App icon** (1024×1024) — same as in step 1.

---

## 5. Submit the build

**Option A – EAS Submit (recommended)**

```bash
eas submit --platform ios --profile production
```

You’ll be prompted for Apple ID and App Store Connect app if not in `eas.json`. Fill `eas.json` → `submit.production.ios` with your Apple ID, Team ID, and ASC App ID for one-command submits.

**Option B – Manual**  
Download the `.ipa` from the EAS build page and upload in App Store Connect via Transporter or Xcode.

---

## 6. Quick order of operations

1. Add `assets/icon.png` (1024×1024).
2. (Optional) Change `bundleIdentifier` in `app.json` to your own.
3. Run `eas build --platform ios --profile production`.
4. Create the app in App Store Connect and add metadata + screenshots.
5. Run `eas submit` or upload the `.ipa` manually.
6. Submit for review in App Store Connect.

---

## 7. In good shape (no action needed)

- Safe area, accessibility labels, light/dark theme, version 1.0.0 and buildNumber set.
- No `console.log` in app code; EAS production profile with autoIncrement.

---

## 8. Pre-submit sanity check

- [ ] Add `assets/icon.png` (1024×1024).
- [ ] Run app: Home → pick preset → Config → Start → run timer (countdown, work, rest) → complete or End → Completion → Restart / Home.
- [ ] Test: swipe to delete saved timer, save new preset, sound on/off, pause/resume.
- [ ] Test on a real device and/or TestFlight before submit.

Once the icon is in place and EAS is configured, you’re ready to build and submit.

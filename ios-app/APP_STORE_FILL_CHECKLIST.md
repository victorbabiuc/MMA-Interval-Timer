# App Store Connect – fill checklist (copy & paste)

**You can save at any time and finish another day.** Use **Save** often; only click **Add for Review** when everything below is done and you’re ready to submit.

---

## 1. This page (App Store → iOS App → 1.0)

### Promotional Text (optional, can change anytime without new version)
```
New: Presets for Boxing, HIIT, Jiu-Jitsu, Kickboxing, and MMA. Custom rounds, sound alerts, and saved timers.
```

### Description (paste this)
```
MMA Interval Timer keeps your workouts on track. Set work and rest rounds, get sound and vibration alerts, and save your favorite presets.

Features:
• Presets for Boxing, HIIT, Jiu-Jitsu, Kickboxing, MMA, or build your own
• Configurable round time, rest time, and number of rounds
• Optional 30- and 10-second warnings
• Countdown beeps in the final 10 seconds
• Opening bell for round start; chime for phase end
• Save custom timers for quick access
• Light and dark mode
• Keeps the screen on during your workout

Ideal for boxing, martial arts, HIIT, and any interval training.
```

### Screenshots (required)
- **Sizes accepted:** 1242×2688, 2688×1242, 1284×2778, or 2778×1284 (iPhone 6.5").
- **Minimum:** 1 screenshot; **up to 10.** First 3 show on the install sheet.
- **How to get them:** Run the app in iOS Simulator (`npx expo start --ios`), go to Home / Config / Active Timer, then **Cmd+S** to save. Drag those files into the screenshot area.
- If you only have one device size (e.g. 6.5"), upload that; you don’t have to fill every tab.

---

## 2. Other sections (sidebar)

| Where | What to enter |
|-------|----------------|
| **App Information** | **Subtitle:** `Workout & round timer` (30 chars max). **Category:** Health & Fitness. **Secondary:** Sports. **Privacy Policy URL:** your hosted `privacy.html` URL (see APP_STORE_COPY.md). |
| **Pricing and Availability** | Free; choose countries. |
| **App Privacy** | Start the questionnaire; for this app (no account, no tracking) it’s minimal. |
| **Age Rating** | Complete questionnaire → typically **4+**. |
| **App Review** | **Notes (optional):** `MMA Interval Timer is a standalone workout timer. It does not collect user data. All settings are stored locally on the device.` |
| **Version Release** | **What’s New:** `Initial release. Interval timer for boxing, HIIT, martial arts, and more. Customizable work and rest rounds, sound alerts, and saved presets.` |

### Keywords (in App Information or version metadata, 100 chars max, comma-separated, no spaces after commas)
```
interval timer,workout timer,boxing,HIIT,rounds,rest timer,fitness,training
```

### Support URL (required – use your repo or contact page)
```
https://github.com/victorbabiuc/MMA-Interval-Timer/issues
```

---

## 3. Privacy Policy URL

You must host `docs/privacy.html` and paste the URL in **App Information → Privacy Policy URL**.

- **GitHub Pages:** Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)** or **/docs** → Save. URL: `https://victorbabiuc.github.io/MMA-Interval-Timer/privacy.html` (if you put privacy.html in repo root or in docs and set root) or `https://victorbabiuc.github.io/MMA-Interval-Timer/docs/privacy.html` depending on your Pages config.

---

**When everything is filled and a build is selected:** Click **Save**, then **Add for Review**, then submit.

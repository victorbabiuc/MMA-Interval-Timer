# App Store screenshots

You need **at least one screenshot per device size** when you submit for review. Easiest: run the app in the **iOS Simulator** and capture.

---

## Option 1: iOS Simulator (Xcode)

1. Open the project in Xcode or run the app in the simulator:
   ```bash
   cd ios-app
   npx expo start --ios
   ```
2. In the Simulator, go to the screen you want (e.g. Home, Config, or Active Timer).
3. **Capture:** **Cmd + S** (saves to Desktop) or **File → Save Screen**.
4. Simulator saves at **full resolution** for that device. Check the image size:
   - **iPhone 15 Pro Max** (6.7"): 1290 × 2796 ✓
   - **iPhone 14 Plus** (6.5"): 1284 × 2778 (close to 1242 × 2688; Apple often accepts)
   - **iPhone 8 Plus** (5.5"): 1242 × 2208 ✓
5. In App Store Connect, open your app → **App Store** tab → the version → **Screenshots**. Drag the image into the correct device size slot (6.7", 6.5", or 5.5").

**Tip:** Take 2–3 screens: Home (presets), Config (settings), and Active Timer (round running). Use the same device size or one per size.

---

## Option 2: No Simulator – use a service

If you don’t have Xcode/Simulator:

- **[screenshots.pro](https://screenshots.pro)** – Upload a design or screenshot; it outputs App Store sizes.
- **Figma / Canva** – Create 1290×2796 (or 1242×2208) artboards, add mockup or phone frame, export PNG.

---

## Required sizes (reference)

| Device | Size (px) |
|--------|-----------|
| 6.7" Display | 1290 × 2796 |
| 6.5" Display | 1242 × 2688 |
| 5.5" Display | 1242 × 2208 |

One screenshot per size is enough for the first submission.

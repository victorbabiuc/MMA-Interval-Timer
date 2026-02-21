# Step-by-step: Publish MMA Interval Timer to the App Store

Goal: **Lock in the app name first**, then get the build submitted. Follow these steps in order.

---

## Do you need Xcode?

**No.** For this flow you do **not** need Xcode installed:

- **Building** – EAS Build runs in the cloud. You run a command; Expo’s servers build the app.
- **Submitting** – EAS Submit (or Transporter app) uploads the build. No Xcode required.
- **Reserving the name** – You create the app in App Store Connect in your browser. No Xcode.

You only need Xcode if you want to build on your own Mac or use the iOS Simulator (you can use Expo Go for testing without Xcode).

---

## What images do you need?

| Image | Size | When you need it | Notes |
|-------|------|-------------------|--------|
| **App icon** | **1024×1024 px** PNG | Before Step 2 (build) | No transparency, no rounded corners. Put at `ios-app/assets/icon.png`. Same file is used for the build and for App Store Connect. |
| **Screenshots** | See below | Before Step 8 (submit for review) | You need at least one screenshot per device size when you click “Submit for Review”. You can add them after the first build is uploaded. |

**Screenshot sizes (iPhone)** – Apple’s current requirements (one per size you support):

- **6.7"** (e.g. iPhone 15 Pro Max): 1290 × 2796 px  
- **6.5"** (e.g. iPhone 11 Pro Max): 1242 × 2688 px  
- **5.5"** (e.g. iPhone 8 Plus): 1242 × 2208 px  

Easiest: run the app in the **iOS Simulator** (Xcode) or on a device, take screenshots (Cmd+S in Simulator), then export at the right size. Or use a tool like [screenshots.pro](https://screenshots.pro) or Figma. For “lock in the name first” you can do screenshots right before Submit for Review.

---

## Step 1: Add the app icon

1. Create or export your icon as **1024×1024 pixels**, PNG, no transparency.
2. Save it as:
   ```
   ios-app/assets/icon.png
   ```
   (Same folder that contains `sounds/`.)

If you don’t have a final icon yet, use any 1024×1024 PNG as a placeholder so the build works. You can replace it later and upload a new build.

---

## Step 2: Install EAS CLI and log in

In a terminal:

```bash
npm install -g eas-cli
eas login
```

- Use your **Expo** account email/password.  
- If you don’t have an account, sign up at [expo.dev](https://expo.dev).  
- You’ll link this to your **Apple Developer** account when you build.

---

## Step 3: Configure EAS (first time only)

From the **project root** (folder that contains `ios-app/`):

```bash
cd "Interval Timer"   # or your project folder name
eas build:configure
```

- Choose **iOS** when asked.  
- It will use your existing `eas.json` and `app.json`.

---

## Step 4: Build the app (cloud build – no Xcode)

From the same project root:

```bash
eas build --platform ios --profile production
```

- First time: you’ll be asked to log in with your **Apple Developer** account and create/select a distribution certificate and provisioning profile. Follow the prompts.  
- The build runs on Expo’s servers. You can close the terminal; you’ll get a link to the build page.  
- Wait until the build status is **Finished** (often 10–20 minutes).

You do **not** need Xcode for this step.

---

## Step 5: Create the app in App Store Connect (this locks the name)

1. Open [App Store Connect](https://appstoreconnect.apple.com) and sign in with your **Apple Developer** account.
2. Go to **My Apps** → click **+** → **New App**.
3. Fill in:
   - **Platform:** iOS  
   - **Name:** `MMA Interval Timer` (or the exact name you want – **this reserves the name**)  
   - **Primary Language:** e.g. English (U.S.)  
   - **Bundle ID:** choose the one that matches your app, e.g. `com.intervaltimer.app` (must match `app.json` → `expo.ios.bundleIdentifier`)  
   - **SKU:** any unique string (e.g. `interval-timer-ios`)  
   - **User Access:** Full Access (or whatever fits your team)
4. Click **Create**.

The app name is now **reserved** for your account. You can add the build and finish metadata next.

---

## Step 6: Get the App Store Connect App ID

You need this for EAS Submit (and for `eas.json`):

1. In App Store Connect, open your app (**MMA Interval Timer**).
2. Go to **App Information** (under General in the left sidebar).
3. Find **Apple ID** – it’s a numeric ID (e.g. `1234567890`). Copy it.

Also get your **Team ID** and **Apple ID email**:

- **Team ID:** App Store Connect → **Users and Access** → **Keys** (or your team membership) → Team ID.  
- **Apple ID:** The email you use for Apple Developer.

---

## Step 7: Submit the build to App Store Connect

**Option A – EAS Submit (recommended)**

From the project root, after the build has finished:

```bash
eas submit --platform ios --profile production
```

- When prompted, choose the **latest build**.
- Enter your **Apple ID** (email), **Team ID**, and **App Store Connect App ID** (the numeric Apple ID from Step 6).  
- EAS uploads the build to App Store Connect.

**Option B – Manual**

1. In [expo.dev](https://expo.dev) → your project → **Builds**, download the **.ipa** for the finished build.  
2. Install [Transporter](https://apps.apple.com/app/transporter/id1450874784) from the Mac App Store.  
3. Open Transporter, sign in with your Apple ID, drag the .ipa in, and deliver.

After the upload, wait a few minutes. In App Store Connect, open your app → **TestFlight** or **App Store** tab. The build should appear and process (e.g. “Processing” → “Ready to Submit”).

---

## Step 8: Fill in metadata and screenshots (required for “Submit for Review”)

In App Store Connect, open your app and complete the **App Store** tab (the one you use for the public store):

1. **Version information**
   - **What’s New:** e.g. “Initial release. Interval timer for boxing, HIIT, and more.”  
   - **Promotional Text** (optional).  
   - **Description:** Short description of the app.  
   - **Keywords:** e.g. `interval timer, boxing, HIIT, workout, rounds`.  
   - **Support URL:** A page with contact/support (can be a simple GitHub page or your site).  
   - **Marketing URL** (optional).

2. **Privacy Policy URL**  
   - Required. If you don’t collect personal data, use a one-line page: “We do not collect personal data.” You can host this on GitHub Pages, Notion, or your site.

3. **App icon**  
   - Upload the same **1024×1024** icon you used in the app (often pre-filled if you uploaded the build).

4. **Screenshots**  
   - For each required **iPhone** size (e.g. 6.7", 6.5", 5.5"), add **at least one screenshot**.  
   - Use the sizes from the table above. Simulator (Cmd+S) or device screenshots, resized if needed.

5. **Build**  
   - In the version’s “Build” section, select the build you submitted in Step 7.

6. **Age Rating, etc.**  
   - Complete the form (e.g. no restricted content → likely 4+).  
   - **App Review Information:** contact phone and any notes if needed.

---

## Step 9: Submit for Review

1. In the same version screen, click **Add for Review** (or **Submit for Review**).  
2. Answer the export compliance and other questions (for a timer with no crypto or encryption, typically “No” for encryption).  
3. Submit.

Apple will review the app (often 24–48 hours). Once approved, the app goes **Ready for Sale** and you can release it manually or set it to auto-release. The name is already locked from Step 5.

---

## Quick reference: order of steps

| Step | What |
|------|------|
| 1 | Add `ios-app/assets/icon.png` (1024×1024) |
| 2 | `npm install -g eas-cli` and `eas login` |
| 3 | `eas build:configure` (first time) |
| 4 | `eas build --platform ios --profile production` |
| 5 | App Store Connect → New App → create “MMA Interval Timer” **(name locked here)** |
| 6 | Copy App Store Connect App ID (and Team ID, Apple ID) |
| 7 | `eas submit --platform ios --profile production` (or Transporter) |
| 8 | In App Store Connect: metadata, privacy URL, screenshots, select build |
| 9 | Submit for Review |

---

## If something doesn’t match

- **Bundle ID** in App Store Connect must match `app.json` → `expo.ios.bundleIdentifier` (e.g. `com.mmaintervaltimerpro.app`).
- **Version:** Keep `appVersionSource: "local"` in `eas.json` and bump `expo.version` in `app.json` for each new submission to avoid "You've already submitted this version" (see **Releasing a new version** below).  
- **App name** in App Store Connect is what users see; it’s reserved as soon as you create the app (Step 5).

For more detail on EAS and credentials, see [Expo’s docs](https://docs.expo.dev/submit/ios/).

---

## Ready-to-use assets in this repo

| What | Where |
|------|--------|
| **App icon** | `ios-app/assets/icon.png` (1024×1024) – already in place |
| **Privacy policy** | `docs/privacy.html` – host for Privacy Policy URL (e.g. GitHub Pages from /docs) |
| **App Store text** | **APP_STORE_COPY.md** – description, subtitle, keywords, What’s New, support URL |
| **Screenshot steps** | **SCREENSHOTS.md** – how to capture simulator screenshots for each device size |
| **New version / release** | **EAS_RELEASE_NOTES.md** – run from ios-app, version bump, appVersionSource local, avoid "already submitted" |

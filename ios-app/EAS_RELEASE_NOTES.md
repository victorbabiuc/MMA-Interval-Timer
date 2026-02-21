# EAS Build & Submit – Release Notes

Notes so we know what to do when releasing a new version to the App Store.

---

## Where to run commands

**Always run EAS from the `ios-app/` folder.** The project root has a Next.js web app; the iOS app is in `ios-app/`.

```bash
cd ios-app
eas build --platform ios --profile production
eas submit --platform ios --latest --profile production
```

If you run from the project root, EAS uses the wrong `package.json` and the build fails in "Install dependencies".

---

## Version and "You've already submitted this version"

Apple identifies builds by **CFBundleShortVersionString** (the version from `expo.version` in `app.json`). You cannot submit the same version twice.

**Do this:**

1. **Use local version in EAS**  
   In `ios-app/eas.json` set:
   ```json
   "appVersionSource": "local"
   ```
   Then the version comes from `ios-app/app.json`, not from App Store Connect.

2. **Bump the version for each submission**  
   In `ios-app/app.json`, update:
   ```json
   "version": "2.0.2"
   ```
   (e.g. 2.0.0 → 2.0.1 → 2.0.2 for each new submit.)

3. **If you see "You've already submitted this version"**  
   - Increment `expo.version` in `ios-app/app.json`.  
   - Confirm `eas.json` has `"appVersionSource": "local"`.  
   - Rebuild, then submit again.

**Why it happens:** With `appVersionSource: "remote"`, EAS reads the version from App Store Connect. If that version was already submitted, the next submit fails. With `"local"`, you control the version in the repo.

---

## Checklist for a new release

1. Bump `version` in `ios-app/app.json`.
2. From `ios-app/`: `eas build --platform ios --profile production`.
3. When build finishes: `eas submit --platform ios --latest --profile production`.
4. In App Store Connect: create the matching version if needed, select the new build, add screenshots/metadata, Submit for Review.

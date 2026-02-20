# MMA Interval Timer – UX Review & Improvement Ideas

Review covers: Home → Config → Active Timer → Completion and cross-cutting patterns.

---

## High impact (do first)

### 1. **Show phase on active timer (Work / Rest / Countdown)**
**Problem:** Users only see the number and round; the background color changes by phase but there’s no text label. At a glance it’s not obvious if it’s work or rest.  
**Fix:** Add a small label above or below the time, e.g. “WORK”, “REST”, “Get ready…” (countdown). Use the existing `timer.phase` and keep it short so it doesn’t compete with the big time.

### 2. **Config: show total workout duration**
**Problem:** Users set rounds, round time, and rest but don’t see total duration until they finish.  
**Fix:** On Config, show a line like “Total: ~29 min” (or “~X min” for fixed rounds, “Unlimited” for perpetual). Update it when rounds/round time/rest change. Helps set expectations and catch misconfigs.

### 3. **Completion: optional auto-redirect**
**Problem:** Auto “Returning home in 4…” can feel rushed; some users want to stay and read stats or share.  
**Fix:** Either increase to 6–8 seconds, or add a “Stay” / “Don’t redirect” control that stops the countdown and leaves them on the completion screen until they tap “Back to Home” or “Restart”.

### 4. **Config: larger tap targets for +/-**
**Problem:** IncControl uses 44×44 buttons; acceptable but on the smaller side for thumbs during a workout setup.  
**Fix:** Increase to at least 48×48 (or 52×52) and/or add a bit more padding so +/- are easier to hit without mis-taps.

---

## Medium impact (clarity & consistency)

### 5. **Home: preset card readability**
**Problem:** Preset names use 11px and cards are 88×88; on small screens or for long names it’s tight.  
**Fix:** Slightly larger cards (e.g. 96×96) and/or font 12–13 with `numberOfLines={2}` and center alignment so two-line names don’t break layout.

### 6. **Config: group toggles**
**Problem:** Six toggles in one block (Perpetual, 30s, 10s, countdown beeps, sound, vibration) are a bit dense.  
**Fix:** Group into “Alerts” (30s, 10s, countdown beeps) and “Sound & haptics” (sound, vibration). Optional: “Round type” (Perpetual) separate. Adds scannability.

### 7. **Config: Save preset modal default name**
**Problem:** Save opens with `config.name` (e.g. “Custom Timer” or “Boxing”); for Custom that’s often generic.  
**Fix:** When the selected preset is Custom, pre-fill with “” or “My Timer” so the user is encouraged to type a meaningful name; for sport presets keep current name as default.

### 8. **Active timer: haptic on phase change**
**Problem:** Phase changes are only communicated by color and (when enabled) sound.  
**Fix:** Trigger a light haptic when switching to Work or Rest (and optionally at end of countdown) so users who glance away get tactile feedback. Respect “Vibration” setting.

### 9. **Completion: cancel auto-redirect on interaction**
**Problem:** If the user taps “Restart” or “Back to Home”, the 4s timer still runs and can navigate again.  
**Fix:** On “Restart” or “Back to Home”, clear the auto-redirect timeout so the app doesn’t navigate a second time.

---

## Lower impact (polish)

### 10. **Home: “Last used” or quick start**
**Problem:** Returning users always start from preset/saved list.  
**Fix:** Optional “Continue with last” or “Last used: Boxing – 3×3:00” that starts the same config again. Store last-used config (e.g. in AsyncStorage) and show a chip or row on Home.

### 11. **Config: round time step option**
**Problem:** Round time only steps by 30s; some want 15s or 1 min.  
**Fix:** Add a step control (e.g. +15 / +30 / +60) or long-press for bigger steps. Low priority unless you get feedback.

### 12. **Active timer: optional “Next phase” hint**
**Problem:** Users might want to know what’s next (e.g. “Next: Rest 1:00”).  
**Fix:** Small text under the round label, e.g. “Next: Rest” or “Next: Round 2”. Keeps the main UI minimal.

### 13. **Accessibility**
**Problem:** No explicit accessibility audit.  
**Fix:** Ensure all interactive elements have `accessibilityLabel` and `accessibilityRole` (you already have many). Add `accessibilityHint` where helpful (e.g. “Double-tap to start workout”). Test with VoiceOver.

### 14. **Completion: share or copy summary**
**Problem:** No way to share or copy “I did 5 rounds, 29 min total.”  
**Fix:** Optional “Share” button that copies a one-liner to clipboard or opens the share sheet. Nice-to-have for social or logging.

---

## Summary table

| # | Area        | Improvement                    | Effort |
|---|-------------|--------------------------------|--------|
| 1 | Active      | Phase label (Work/Rest/Countdown) | Low  |
| 2 | Config      | Total duration preview         | Low  |
| 3 | Completion  | Longer or optional auto-redirect | Low  |
| 4 | Config      | Bigger +/- tap targets         | Low  |
| 5 | Home        | Preset card size/readability   | Low  |
| 6 | Config      | Group toggles                  | Medium |
| 7 | Config      | Save modal default name        | Low  |
| 8 | Active      | Haptic on phase change         | Low  |
| 9 | Completion  | Cancel redirect on button tap  | Low  |
|10 | Home        | Last-used quick start          | Medium |
|11 | Config      | Round time step options        | Medium |
|12 | Active      | “Next phase” hint              | Low  |
|13 | All         | Accessibility pass             | Medium |
|14 | Completion  | Share/copy summary              | Medium |

Recommendation: implement **1 (phase label)**, **2 (total duration)**, **3 or 9 (completion redirect)** and **4 (tap targets)** first for the biggest UX gain with minimal code.

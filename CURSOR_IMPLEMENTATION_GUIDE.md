# Sports Interval Timer - Complete Cursor Implementation Guide

## 📊 Analysis Summary

V0 has built **an excellent foundation** with:
- ✅ Beautiful, modern UI with gradients and animations
- ✅ Complete component structure (Home, Config, Timer, Completion screens)
- ✅ Timer logic with useTimer hook
- ✅ Audio beeps using Web Audio API
- ✅ LocalStorage for saved presets
- ✅ Responsive design with Tailwind
- ✅ Progress ring visualization
- ✅ Vibration API support

### What's Already Working:
1. **Full UI/UX** - All 4 screens beautifully designed
2. **Timer Logic** - Countdown, work, rest phases with proper transitions
3. **Audio System** - Beeps for warnings and phase changes
4. **LocalStorage** - Save custom presets
5. **Preset System** - 5 built-in sports presets + custom
6. **Animations** - Gradients, pulses, transitions

### What Needs Enhancement:
1. ⚠️ **Wake Lock API** - Keep screen on during workout (not implemented)
2. ⚠️ **Better mobile optimization** - Some touch targets could be larger
3. ⚠️ **Keyboard shortcuts** - Space for pause, ESC for stop
4. ⚠️ **PWA support** - Service worker and manifest for installability
5. ⚠️ **Error handling** - More robust permission handling
6. ⚠️ **Performance** - Timer uses setInterval (could use requestAnimationFrame)

---

## 🚀 CURSOR WORKFLOW - Step by Step

### STEP 0: Initial Setup

```bash
# Navigate to your project directory
cd sports-interval-timer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open http://localhost:3000 and verify the app loads.

---

### STEP 1: Add Wake Lock API (Keep Screen On)

**Prompt for Cursor:**

```
Add Wake Lock API support to keep the screen on during active workouts.

Requirements:
1. Create a new hook: hooks/use-wake-lock.ts
2. Request wake lock when timer starts
3. Release wake lock when timer stops or completes
4. Handle permission denied gracefully
5. Add visual indicator when wake lock is active (optional)

Integrate this into components/active-timer.tsx so the screen stays on during workouts.
Handle browser compatibility - some browsers don't support Wake Lock API.
```

**Expected Changes:**
- New file: `hooks/use-wake-lock.ts`
- Modified: `components/active-timer.tsx`

**Test:**
- Start a timer on mobile
- Screen should not auto-sleep during workout
- When workout ends, screen can sleep normally

---

### STEP 2: Improve Timer Accuracy with requestAnimationFrame

**Prompt for Cursor:**

```
The current timer uses setInterval which can drift over time. Refactor hooks/use-timer.ts to use requestAnimationFrame for more accurate timing.

Requirements:
1. Replace setInterval with requestAnimationFrame loop
2. Track elapsed time using performance.now() or Date.now()
3. Update timer display every animation frame but trigger alerts only at the correct second boundaries
4. Ensure pause/resume works correctly with the new timing system
5. Maintain all existing functionality (beeps, vibrations, phase transitions)

This is important for accuracy during long workouts (30+ minutes).
```

**Expected Changes:**
- Modified: `hooks/use-timer.ts`

**Test:**
- Start a 5 minute timer
- Let it run for 5 minutes
- Verify it completes at exactly 5:00, not 5:02 or 4:58

---

### STEP 3: Add Keyboard Shortcuts

**Prompt for Cursor:**

```
Add keyboard shortcuts for better desktop experience:
- SPACE: Pause/Resume timer
- ESC: Stop/End workout (with confirmation)
- Number keys 1-5: Quick select preset on home screen

Requirements:
1. Only active on appropriate screens (timer, home)
2. Don't interfere with input fields
3. Show keyboard hint on first visit (localStorage to track)
4. Add aria-keyshortcuts attributes for accessibility

Update components/active-timer.tsx and components/home-screen.tsx
```

**Expected Changes:**
- Modified: `components/active-timer.tsx`
- Modified: `components/home-screen.tsx`

**Test:**
- On timer screen: Space pauses, ESC stops
- On home screen: Number keys select presets
- Shortcuts don't trigger when typing in inputs

---

### STEP 4: PWA Support (Progressive Web App)

**Prompt for Cursor:**

```
Make this app installable as a PWA for mobile devices.

Requirements:
1. Create public/manifest.json with app metadata
   - Name: "Interval Timer"
   - Short name: "Timer"
   - Icons: 192x192 and 512x512 (you can use emoji-based icons or placeholders)
   - Theme color: #10b981 (emerald)
   - Background color: #0f172a (slate-900)
   - Display: standalone
   - Orientation: portrait

2. Add manifest link to app/layout.tsx

3. Create a basic service worker for offline capability:
   - Cache the app shell (HTML, CSS, JS)
   - Network-first strategy for dynamic content
   - Offline fallback page

4. Register service worker in app/layout.tsx

5. Add install prompt for users on first visit (optional)
```

**Expected Changes:**
- New file: `public/manifest.json`
- New file: `public/sw.js` (service worker)
- Modified: `app/layout.tsx`

**Test:**
- On mobile Chrome: See "Add to Home Screen" option
- Install app
- Open from home screen - should open fullscreen
- Close dev server - app should still load from cache

---

### STEP 5: Enhanced Error Handling

**Prompt for Cursor:**

```
Add comprehensive error handling for browser APIs that might fail:

1. Audio Context - some browsers block autoplay
2. Vibration API - not all devices support it
3. Wake Lock - not all browsers support it
4. LocalStorage - might be full or disabled

Requirements:
- Show user-friendly toast notifications when permissions are denied
- Gracefully degrade features if APIs unavailable
- Add a settings panel where users can re-enable permissions
- Use sonner (already installed) for toast notifications

Update relevant components and hooks to handle these errors.
```

**Expected Changes:**
- Modified: `hooks/use-timer.ts`
- Modified: `hooks/use-wake-lock.ts`
- Modified: `components/active-timer.tsx`
- New component: `components/settings-dialog.tsx` (optional)

**Test:**
- Block audio permissions in browser
- App should show toast but continue working
- Visual alerts should still work

---

### STEP 6: Mobile Touch Optimizations

**Prompt for Cursor:**

```
Optimize for mobile touch interactions:

1. Increase touch target sizes to minimum 48x48px (WCAG guideline)
2. Add haptic feedback on all button presses (using Vibration API)
3. Prevent double-tap zoom on buttons
4. Add touch-action: manipulation to interactive elements
5. Improve swipe gestures for saved timer management (swipe to delete)

Focus on components:
- components/preset-card.tsx
- components/saved-timer-item.tsx
- components/increment-control.tsx
- components/active-timer.tsx
```

**Expected Changes:**
- Modified: Multiple component files
- Updated: CSS classes for touch targets

**Test:**
- On mobile: All buttons feel responsive
- No accidental double-tap zooms
- Buttons vibrate on press

---

### STEP 7: Performance Optimizations

**Prompt for Cursor:**

```
Optimize app performance for smooth 60fps:

1. Memoize expensive calculations in components
2. Use React.memo for components that re-render frequently
3. Lazy load completion screen (only when needed)
4. Optimize re-renders in active-timer.tsx
5. Use CSS transforms instead of layout properties for animations
6. Add loading states for saved presets

Use React.memo, useMemo, useCallback appropriately.
```

**Expected Changes:**
- Modified: Multiple component files
- Better React performance patterns

**Test:**
- Open Chrome DevTools Performance tab
- Record during timer - should maintain 60fps
- No layout thrashing

---

### STEP 8: Accessibility Improvements

**Prompt for Cursor:**

```
Enhance accessibility (WCAG AA compliance):

1. Add proper ARIA labels to all interactive elements
2. Ensure keyboard navigation works throughout app
3. Add focus visible states (already have some)
4. Screen reader announcements for round changes
5. Add aria-live regions for timer countdown
6. Ensure color contrast ratios meet WCAG AA
7. Add skip-to-content link
8. Support prefers-reduced-motion (already partially done)

Update all component files to be fully accessible.
```

**Expected Changes:**
- Modified: All component files
- Better ARIA attributes
- Screen reader support

**Test:**
- Use NVDA/JAWS screen reader
- Navigate entire app with keyboard only
- Check color contrast with browser tools

---

### STEP 9: Add Settings Panel

**Prompt for Cursor:**

```
Create a global settings panel for user preferences:

Settings to include:
1. Sound on/off (global default)
2. Vibration on/off (global default)
3. Wake lock on/off
4. Theme: System/Light/Dark (bonus feature)
5. Default warning times (30s, 10s)
6. Default beep sounds enabled
7. Export/Import saved presets (JSON)

Requirements:
- Add settings icon to home screen header
- Create a settings dialog/modal
- Store preferences in localStorage
- Apply preferences to new timers by default
- Use shadcn Dialog component (already installed)

Files to create/modify:
- components/settings-dialog.tsx (new)
- components/home-screen.tsx (add settings button)
- lib/settings.ts (new - settings utilities)
```

**Expected Changes:**
- New file: `components/settings-dialog.tsx`
- New file: `lib/settings.ts`
- Modified: `components/home-screen.tsx`
- Modified: `app/page.tsx`

**Test:**
- Change settings
- Create new timer - should use new defaults
- Refresh page - settings persist

---

### STEP 10: Stats Tracking (Bonus Feature)

**Prompt for Cursor:**

```
Add workout history tracking:

1. Track completed workouts in localStorage
   - Date/time
   - Preset used
   - Total rounds completed
   - Total time

2. Create a stats/history screen accessible from home
   - List of past workouts
   - Summary stats (total workouts, total time, favorite preset)
   - Delete individual workouts
   - Clear all history

3. Add celebration milestone toasts:
   - First workout completed
   - 10th workout
   - 50th workout
   - 100+ hours total

Files to create:
- components/stats-screen.tsx
- lib/workout-history.ts
- Update app/page.tsx to add stats screen

This is a value-add feature users will love!
```

**Expected Changes:**
- New file: `components/stats-screen.tsx`
- New file: `lib/workout-history.ts`
- Modified: `app/page.tsx`
- Modified: `components/home-screen.tsx`

**Test:**
- Complete several workouts
- Check stats screen
- Verify milestones trigger

---

### STEP 11: Export & Share Presets (Bonus)

**Prompt for Cursor:**

```
Add ability to export and share custom presets:

1. Export preset as JSON file (download)
2. Import preset from JSON file (upload)
3. Share preset as URL (encode in query params)
4. Copy preset as shareable link

Add these options to:
- Saved timer items (export individual)
- Settings panel (export all, import)
- Config screen (share button)

Use Web Share API when available for native sharing.
```

**Expected Changes:**
- Modified: `components/saved-timer-item.tsx`
- Modified: `components/config-screen.tsx`
- Modified: `components/settings-dialog.tsx`
- New utility: `lib/preset-sharing.ts`

**Test:**
- Export preset
- Import it back
- Share URL - verify it loads preset

---

### STEP 12: Final Polish & Bug Fixes

**Prompt for Cursor:**

```
Final polish pass:

1. Fix any console warnings/errors
2. Test all edge cases:
   - Timer with 0 rest time
   - Timer with 100 rounds
   - Very short rounds (5 seconds)
   - Very long rounds (60 minutes)
   - Rapid pause/resume
   - Closing browser during timer

3. Add loading states where missing
4. Smooth out any jarring transitions
5. Ensure all text is readable on all backgrounds
6. Add meta tags for better SEO and social sharing
7. Test on multiple browsers (Chrome, Safari, Firefox)
8. Test on multiple devices (iOS, Android)

Create a comprehensive test checklist in TESTING.md
```

**Expected Changes:**
- Modified: Various files with bug fixes
- New file: `TESTING.md`

**Test:**
- Run through entire app
- Complete at least one full workout
- Try all features
- Verify no errors in console

---

## 🎯 Priority Order Recommendation

### Essential (Do These First):
1. ✅ Step 1: Wake Lock API
2. ✅ Step 2: Timer Accuracy (requestAnimationFrame)
3. ✅ Step 4: PWA Support
4. ✅ Step 5: Error Handling

### Important (High Value):
5. ✅ Step 6: Mobile Touch Optimizations
6. ✅ Step 7: Performance
7. ✅ Step 8: Accessibility

### Nice to Have (User Delight):
8. ✅ Step 3: Keyboard Shortcuts
9. ✅ Step 9: Settings Panel
10. ✅ Step 10: Stats Tracking
11. ✅ Step 11: Export/Share Presets

### Final:
12. ✅ Step 12: Polish & Testing

---

## 🐛 Known Issues to Fix

Based on code review, here are specific bugs to address:

### Issue 1: Timer doesn't save preferences
**In `app/page.tsx`**, saved presets work but there's no global preferences persistence.

**Fix:**
```
Create lib/preferences.ts to manage:
- Last used preset
- Sound/vibration defaults
- Warning defaults
Load on mount, apply to new configs
```

### Issue 2: No confirmation before ending workout
**In `components/active-timer.tsx`**, clicking X immediately ends workout.

**Fix:**
```
Add confirmation dialog:
"Are you sure you want to end this workout?"
[Keep Going] [End Workout]
```

### Issue 3: Progress ring doesn't update smoothly on pause
**In `components/active-timer.tsx`**, when paused the ring stays static.

**Fix:**
```
Ensure progress calculation updates even when paused
Ring should reflect current time remaining accurately
```

### Issue 4: No visual feedback for perpetual rounds
**In `lib/types.ts`**, perpetualRounds exists but UI doesn't clearly show it.

**Fix:**
```
Add visual indicator on config screen
Show "∞" instead of round count when perpetual
Add "Stop workout manually" hint
```

---

## 📱 Testing Checklist

After implementing changes, test:

### Functional Tests:
- [ ] All 5 presets load and work correctly
- [ ] Custom timer creation works
- [ ] Save custom preset works
- [ ] Delete saved preset works
- [ ] Timer counts down accurately
- [ ] Audio beeps play at correct times
- [ ] Vibration triggers correctly
- [ ] Pause/resume works
- [ ] Stop/end workout works
- [ ] Completion screen shows correct stats
- [ ] Restart timer works
- [ ] Back navigation works
- [ ] LocalStorage persists across refreshes

### Browser Tests:
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Device Tests:
- [ ] iPhone
- [ ] Android phone
- [ ] iPad/tablet
- [ ] Desktop

### Accessibility Tests:
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Focus visible on all elements
- [ ] Color contrast passes WCAG AA
- [ ] Works with reduced motion

### Performance Tests:
- [ ] Maintains 60fps during timer
- [ ] No memory leaks on long timers
- [ ] App loads in <2 seconds
- [ ] Smooth animations

---

## 🔧 Useful Cursor Commands

Throughout development, use these Cursor commands:

```
# Fix TypeScript errors
"Fix all TypeScript errors in this file"

# Optimize component
"Optimize this component for performance using React.memo and useMemo"

# Add error handling
"Add comprehensive error handling to this function with try-catch and user-friendly error messages"

# Make responsive
"Make this component responsive for mobile, tablet, and desktop"

# Add accessibility
"Add proper ARIA labels and keyboard navigation to this component"

# Fix warnings
"Fix all ESLint warnings in this file"
```

---

## 📦 Additional Dependencies (if needed)

You may want to add:

```bash
# For better date formatting
pnpm add date-fns

# For animations (optional, already have CSS)
pnpm add framer-motion

# For charts in stats screen
pnpm add recharts

# Already installed (you're good!):
# - sonner (toast notifications)
# - lucide-react (icons)
# - tailwindcss (styling)
```

---

## 🎨 Design Improvements (Optional)

Consider these visual enhancements:

1. **Confetti animation** on workout complete (already in CSS!)
2. **Sound picker** - let users choose beep sounds
3. **Color themes** - different gradient schemes
4. **Custom timer faces** - analog clock, progress bar variants
5. **Motivational quotes** during rest periods
6. **Achievement badges** for milestones

---

## 🚢 Deployment Checklist

When ready to deploy:

```bash
# Build for production
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel (recommended for Next.js)
vercel --prod

# Or deploy to Netlify, Cloudflare Pages, etc.
```

**Before deploying:**
- [ ] Remove console.logs
- [ ] Test on real mobile devices
- [ ] Verify PWA manifest
- [ ] Check service worker caching
- [ ] Test offline mode
- [ ] Add analytics (optional)
- [ ] Add error tracking like Sentry (optional)

---

## 📄 Documentation to Create

Create these files for better project maintenance:

1. **README.md** - How to run, deploy, contribute
2. **TESTING.md** - Comprehensive test scenarios
3. **CHANGELOG.md** - Version history
4. **CONTRIBUTING.md** - Guidelines for contributors (if open source)

---

## 🎓 Learning Resources

If you want to dive deeper:

- **Wake Lock API**: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **PWA Guide**: https://web.dev/progressive-web-apps/
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Performance**: https://react.dev/learn/render-and-commit

---

## 🎉 Conclusion

You have an **excellent foundation** from v0! The app is:
- ✅ Beautiful and modern
- ✅ Functionally complete
- ✅ Well-structured code
- ✅ Ready for enhancements

**Recommended Path:**
1. Test the current app thoroughly (it might already be perfect!)
2. Implement essential features (Steps 1-5)
3. Add nice-to-haves based on user feedback
4. Deploy and iterate

The hardest part (great design + core logic) is **already done**! Now it's just enhancement and polish.

Good luck! 🚀

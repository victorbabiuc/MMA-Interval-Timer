# 🚀 CURSOR QUICK PROMPTS - Copy & Paste These

## Setup
```bash
cd sports-interval-timer
pnpm install
pnpm dev
```

---

## PROMPT 1: Wake Lock API
```
Add Wake Lock API support to keep the screen on during active workouts.

Requirements:
1. Create a new hook: hooks/use-wake-lock.ts that:
   - Requests wake lock when called
   - Releases wake lock on cleanup
   - Handles permission denied gracefully
   - Returns { isActive, request, release } 

2. Integrate into components/active-timer.tsx:
   - Request wake lock when timer starts
   - Release when timer stops or completes
   - Handle browser compatibility (check if 'wakeLock' in navigator)

3. Add optional visual indicator showing wake lock is active

Example implementation:
- Use navigator.wakeLock.request('screen')
- Store the lock in a ref
- Release on unmount and when timer completes
```

---

## PROMPT 2: Timer Accuracy
```
The current timer in hooks/use-timer.ts uses setInterval which can drift. Refactor to use requestAnimationFrame for accuracy.

Changes needed:
1. Replace setInterval with requestAnimationFrame
2. Track start time using Date.now() or performance.now()
3. Calculate elapsed time on each frame
4. Only trigger beeps/vibrations when crossing second boundaries
5. Keep all existing functionality (pause, resume, phase transitions)

Implementation approach:
- Store startTime in ref
- Store pauseTime for pause/resume
- Use requestAnimationFrame for smooth updates
- Derive timeRemaining from elapsed time, not decrements

This prevents drift during long workouts (30+ min sessions).
```

---

## PROMPT 3: Keyboard Shortcuts
```
Add keyboard shortcuts for desktop users:

Shortcuts:
- SPACE: Pause/Resume timer (only on active-timer screen)
- ESC: Stop workout with confirmation dialog (only on active-timer screen)  
- 1-5: Quick select preset (only on home screen)

Requirements:
1. Add useEffect with keyboard event listeners
2. Don't trigger if user is typing in an input field
3. Add confirmation dialog for ESC (using shadcn AlertDialog)
4. Add aria-keyshortcuts attributes for accessibility
5. Show keyboard hints tooltip on first visit (use localStorage to track)

Files to modify:
- components/active-timer.tsx (SPACE, ESC)
- components/home-screen.tsx (1-5 number keys)
```

---

## PROMPT 4: PWA Support
```
Make this app installable as a PWA:

Tasks:
1. Create public/manifest.json:
{
  "name": "Interval Timer",
  "short_name": "Timer",
  "description": "Sports interval timer for boxing, MMA, HIIT, and more",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0f172a",
  "theme_color": "#10b981",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

2. Add manifest link to app/layout.tsx in <head>

3. Create public/sw.js (service worker) with:
   - Cache app shell on install
   - Network-first strategy
   - Offline fallback

4. Register service worker in app/layout.tsx (use useEffect)

5. Create placeholder icons (use emoji as SVG for now):
   - public/icon-192.png
   - public/icon-512.png

Also add viewport meta tag for mobile if not present.
```

---

## PROMPT 5: Error Handling
```
Add comprehensive error handling for browser APIs that might fail or be blocked:

APIs to handle:
1. AudioContext (autoplay might be blocked)
2. Vibration API (not all devices support it)
3. Wake Lock API (not all browsers)
4. localStorage (might be full or disabled in private mode)

Requirements:
1. Wrap all API calls in try-catch
2. Use sonner toast to show user-friendly errors
3. Gracefully degrade if APIs unavailable
4. Add a Toaster component to app layout (sonner is installed)
5. Don't break the app if permissions denied

Example error messages:
- "Audio blocked - please enable sound in browser settings"
- "Vibration not supported on this device"
- "Screen wake lock unavailable - screen may sleep during workout"

Files to modify:
- hooks/use-timer.ts (audio, vibration)
- hooks/use-wake-lock.ts (wake lock)
- app/page.tsx (localStorage)
- app/layout.tsx (add Toaster)
```

---

## PROMPT 6: Mobile Touch
```
Optimize for mobile touch interactions:

Improvements:
1. Ensure all buttons are minimum 48x48px (WCAG guideline)
2. Add haptic feedback on button presses using navigator.vibrate(20)
3. Add touch-action: manipulation to prevent double-tap zoom
4. Increase spacing between touch targets
5. Add swipe-to-delete for saved timers (optional but nice)

Files to check:
- components/preset-card.tsx (make cards bigger on mobile)
- components/saved-timer-item.tsx (add swipe if possible)
- components/increment-control.tsx (larger buttons)
- components/active-timer.tsx (larger pause/stop buttons)

Add Tailwind classes like:
- min-h-12 min-w-12 (48px touch targets)
- touch-manipulation
- Add haptic vibrate(20) onClick handlers
```

---

## PROMPT 7: Performance
```
Optimize app performance for smooth 60fps:

Optimizations:
1. Wrap expensive components in React.memo:
   - PresetCard
   - SavedTimerItem
   - IncrementControl
   - ProgressRing

2. Use useMemo for expensive calculations:
   - formatTime calls
   - Progress calculations
   - Stats calculations

3. Use useCallback for event handlers passed as props

4. Ensure CSS animations use transform/opacity (not layout properties)

5. Add React Suspense for code splitting (lazy load completion screen)

6. Check for unnecessary re-renders using React DevTools

Don't over-optimize - focus on components that re-render frequently (especially active-timer).
```

---

## PROMPT 8: Accessibility
```
Enhance accessibility to meet WCAG AA standards:

Improvements needed:
1. Add comprehensive ARIA labels to all icon-only buttons
2. Add aria-live="polite" region for timer countdown announcements
3. Ensure all interactive elements have visible focus states
4. Add skip-to-content link at top of page
5. Verify color contrast ratios (use contrast checker)
6. Add proper heading hierarchy (h1, h2, h3)
7. Ensure keyboard navigation works throughout app
8. Add screen reader announcements for phase changes

Files to update:
- All component files
- Add proper semantic HTML
- Add ARIA attributes where needed
- Test with NVDA or VoiceOver screen reader
```

---

## PROMPT 9: Settings Panel
```
Create a settings panel for global user preferences:

Create new component: components/settings-dialog.tsx

Settings to include:
1. Sound enabled (default true)
2. Vibration enabled (default true)  
3. Wake lock enabled (default true)
4. 30s warning (default true)
5. 10s warning (default true)
6. Countdown beeps (default true)
7. Export all presets (download JSON)
8. Import presets (upload JSON)
9. Clear all data (with confirmation)

Storage: Create lib/user-preferences.ts to:
- Load preferences from localStorage
- Save preferences to localStorage
- Provide default preferences
- Apply preferences to new timers

Add settings icon (gear) to home screen header that opens the dialog.
Use shadcn Dialog component (already installed).
```

---

## PROMPT 10: Stats Tracking
```
Add workout history and stats tracking:

Create new files:
1. lib/workout-history.ts - utilities for storing workouts
2. components/stats-screen.tsx - display workout history

Features:
1. Save completed workout to localStorage:
   {
     id: string,
     date: number,
     presetName: string,
     rounds: number,
     totalTime: number,
     roundTime: number,
     restTime: number
   }

2. Stats to display:
   - Total workouts completed
   - Total training time
   - Favorite preset (most used)
   - Longest workout
   - Current streak
   - List of past 20 workouts

3. Add navigation:
   - Add "Stats" button to home screen
   - New screen type in app/page.tsx
   - Back button from stats to home

4. Milestone celebrations (sonner toast):
   - First workout: "Great start! 🎉"
   - 10 workouts: "10 workouts completed! 💪"
   - 50 workouts: "You're on fire! 🔥"
   - 100 hours: "Century club! 🏆"

5. Option to clear history
```

---

## PROMPT 11: Export/Share
```
Add preset export and sharing functionality:

Features:
1. Export individual preset as JSON file (download)
2. Import preset from JSON file (upload)
3. Share preset as URL with query params
4. Copy shareable link to clipboard

Implementation:
1. Add "Share" and "Export" buttons to:
   - components/saved-timer-item.tsx (individual preset)
   - components/config-screen.tsx (current config)
   - components/settings-dialog.tsx (export all)

2. Create lib/preset-sharing.ts with functions:
   - exportPresetAsJSON(preset)
   - importPresetFromJSON(file)
   - encodePresetToURL(preset)
   - decodePresetFromURL(params)

3. In app/page.tsx:
   - Check URL params on mount
   - If preset found in URL, load it to config screen
   - Show toast: "Preset loaded from link"

4. Use Web Share API when available:
   if (navigator.share) {
     navigator.share({ url: shareableURL })
   }
   Otherwise, copy to clipboard and show toast
```

---

## PROMPT 12: Final Polish
```
Final polish and bug fixes:

Tasks:
1. Review all console.logs and remove or convert to proper logging
2. Fix any ESLint warnings
3. Add loading states for saved presets
4. Add confirmation dialog before deleting preset
5. Add confirmation dialog before ending active workout
6. Handle edge cases:
   - Timer with 0 rest time (skip rest, go to next round)
   - Timer with 1000+ rounds (show in compact format)
   - Very short rounds (<10 seconds)
   - Very long rounds (>60 minutes)

7. Add meta tags to app/layout.tsx:
   - og:title, og:description, og:image
   - twitter:card
   - viewport (if missing)
   - theme-color

8. Test thoroughly and create TESTING.md with checklist

9. Smooth any jarring transitions

10. Ensure proper TypeScript typing throughout (no 'any' types)
```

---

## BONUS PROMPT: Theme Switcher
```
Add light/dark theme support (currently dark only):

Use next-themes (already installed):
1. In app/layout.tsx, wrap with ThemeProvider
2. Add theme toggle button in settings
3. Update Tailwind config for light mode colors
4. Test gradients work in both modes
5. Ensure all text is readable in both themes

Light mode colors:
- Background: white/gray-50
- Cards: gray-100
- Text: gray-900
- Keep gradients vibrant in both modes
```

---

## Common Debug Prompts

```
"Fix all TypeScript errors in this file"

"This component is re-rendering too often, optimize it with React.memo and useCallback"

"Add proper error handling with try-catch and user feedback for this function"

"Make this component fully accessible with proper ARIA labels and keyboard navigation"

"This animation is janky, optimize it to use transform and opacity only"

"Add comprehensive JSDoc comments to this file"

"Write unit tests for this function using Jest"
```

---

## Deployment Commands

```bash
# Build
pnpm build

# Test build locally
pnpm start

# Deploy to Vercel
npx vercel --prod

# Check build size
npx next build --profile
```

---

## Quick Wins (Do These First!)

1. **Wake Lock** (PROMPT 1) - 10 mins
2. **Error Handling** (PROMPT 5) - 15 mins  
3. **PWA Manifest** (PROMPT 4) - 20 mins
4. **Mobile Touch** (PROMPT 6) - 15 mins

Total: ~1 hour for major improvements!

---

## Pro Tips

- Test each change before moving to next
- Commit after each working feature
- Use Cursor's "Fix" and "Edit" modes liberally
- Reference existing code patterns in prompts
- Ask Cursor to explain complex changes
- Use `pnpm dev` to hot-reload changes

---

Good luck! The app is already 80% done - these prompts will take it to 100%! 🚀

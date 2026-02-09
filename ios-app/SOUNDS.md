# Timer sounds

## Hearing the beep in Expo

1. **Volume & silent switch** – Turn the device **volume up** and, on iPhone, turn the **silent switch off** (orange = muted).
2. **First run needs network** – The chime is loaded from a URL on first use. Ensure the device has internet once; after that it’s cached for the session.
3. **Start a workout** – Enable **Sound** in the timer config, start a preset, and wait for the 10s countdown or the 30s/10s warnings.
4. **Development build** – For the most reliable playback, use a dev build (`eas build --profile development`) instead of Expo Go.

---

## Current implementation

- **Opening bell** – Bundled `assets/sounds/opening-bell.mp3` plays when a **work round starts** (after countdown or after rest). Your file; no network needed.
- **Chime** – Mixkit MP3 (remote, then cached) for countdown (last 10s), 30s/10s warnings, and **phase end** (triple beep when work or rest ends).
- Only one file is bundled (~23 KB); the chime is loaded on demand.

---

## Native iOS clock sounds (optional later)

Expo doesn’t expose iOS system sounds. Options: **(A)** Custom native module / `react-native-system-sounds` for real system sounds (dev build only), or **(B)** Ship bundled .mp3/.caf “clock-like” sounds and let the user pick in the app.

---

## Sound URL reference (for adding more sounds)

Use these only if you add more sounds. Respect each source’s license (attribution when required).

**Mixkit (no attribution)**  
- Chime in app: `https://assets.mixkit.co/active_storage/sfx/2869-magical-chime.mp3`  
- More: [mixkit.co/free-sound-effects](https://mixkit.co/free-sound-effects) → download a sound, then copy the final URL from the browser.

**SoundBible** – Pattern: `https://soundbible.com/grab.php?id={ID}&type=mp3`  
- Tick: id 1258  
- Chimes/beeps: 1598, 91, 1619 (Public Domain), 1821 (Public Domain)  
- Bells: 2218 (service), 2185 (old school), 1746 (ship), 2171 (church)  
- Boxing (personal use only): 56 (start round), 55 (end round)

**Boxing / round bells (commercial-friendly)**  
- Freesoundslibrary: https://www.freesoundslibrary.com/wp-content/uploads/2020/04/boxing-bell.zip (CC BY 4.0)  
- Wikimedia gong (public domain): https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fa/Gong_or_bell_vibrant.ogg/Gong_or_bell_vibrant.ogg.mp3 (trim to shorten)  
- Freesound (login): Benboncan “Boxing Bell” / “Boxing Bell 1”; Mateusz_Chenc “Boxing Bell Signals” (CC0)

To bundle a downloaded file: put it in `assets/sounds/` and reference it in code (e.g. `require('../../assets/sounds/yourfile.mp3')`).

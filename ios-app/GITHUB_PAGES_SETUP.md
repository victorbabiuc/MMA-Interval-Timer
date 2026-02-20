# Fix 404 – Enable GitHub Pages

Your repo has **privacy.html** at the root, but the site returns 404 because **GitHub Pages is not enabled** (or not built yet) for **MMA-Interval-Timer**.

## Steps (do this once)

1. Open: **https://github.com/victorbabiuc/MMA-Interval-Timer**
2. Click **Settings** (repo tabs: Code, Issues, … **Settings**).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source:** choose **Deploy from a branch**
   - **Branch:** choose **main**
   - **Folder:** choose **/ (root)**
   - Click **Save**.
5. Wait **1–3 minutes**. GitHub will build the site. You may see a yellow “Building” message that later turns green with a URL like:  
   `https://victorbabiuc.github.io/MMA-Interval-Timer/`

## Then use this Privacy Policy URL

After the build is live, this link will work (and use it in App Store Connect):

**https://victorbabiuc.github.io/MMA-Interval-Timer/privacy.html**

Open it in your browser to confirm it loads before pasting into Apple.

---

If it still 404s after 5 minutes, check:
- Branch is **main** (not master).
- Folder is **/ (root)**.
- No custom domain set that could conflict.

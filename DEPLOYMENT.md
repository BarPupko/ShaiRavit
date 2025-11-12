# Deployment Guide

## Two Versions of the Site

You now have **two versions** of `index.html`:

### 1. **index.html** (For GitHub Pages)
- ✅ Firebase config **embedded inline**
- ✅ Works on `https://barpupko.github.io/ShaiRavit/`
- ✅ No external `firebase-config.js` needed
- ⚠️ API keys are visible in source (this is safe for Firebase client SDK)

### 2. **index-new.html** (For Local Development)
- ✅ Loads `firebase-config.js` externally
- ✅ Better for local testing
- ✅ Config file can be excluded from git
- ✅ Use this for development

---

## Deploying to GitHub Pages

### Option 1: Automatic (Recommended)

Already done! Your site is live at:
**https://barpupko.github.io/ShaiRavit/**

The `index.html` file (with embedded config) will be used automatically.

### Option 2: Manual Update

If you made changes:

```bash
# Make sure you're on main branch
git checkout main

# Merge your feature branch
git merge feature/firebase-integration-and-improvements

# Push to GitHub
git push origin main
```

Wait 1-2 minutes, then visit: https://barpupko.github.io/ShaiRavit/

---

## Testing the Deployment

1. **Visit your site**: https://barpupko.github.io/ShaiRavit/

2. **Open browser console (F12)**:
   - Should see: `"Firebase initialized successfully"`
   - Should NOT see: `404` errors for `firebase-config.js`

3. **Test blessing submission**:
   - Click "שלחו לנו ברכה"
   - Submit a test blessing
   - Should appear floating on screen

4. **Check Firebase Console**:
   - Visit: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/data
   - Look for: `ShaiRevital/blessings/`
   - Your test blessing should be there

---

## Local Development

For working locally, use **index-new.html**:

```bash
# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000/index-new.html
```

This version loads `firebase-config.js` from file, which is in `.gitignore`.

---

## Security Notes

### Is it safe to have Firebase config in index.html?

**Yes!** ✅ Firebase client SDKs are designed for public web apps.

The API key in the config is **not a secret**. It only:
- Identifies your Firebase project
- Is restricted by Firebase Security Rules
- Cannot be used to access your database without rules allowing it

**Real security** comes from:
1. ✅ **Firebase Database Rules** (you set these in Console)
2. ✅ **Domain restrictions** (optional, set in Firebase Console)

### What IS protected?

The **service account JSON file** is the real secret:
- ✅ Protected by `.gitignore`
- ❌ Never commit this file
- ❌ Never put it in `index.html`

---

## File Usage Summary

| File | Purpose | In Git? | Deploy? |
|------|---------|---------|---------|
| `index.html` | Production (GitHub Pages) | ✅ Yes | ✅ Yes |
| `index-new.html` | Local development | ✅ Yes | ❌ No |
| `firebase-config.js` | Local config file | ❌ No | ❌ No |
| `firebase-config.template.js` | Template for others | ✅ Yes | ❌ No |
| `script.js` | Main JavaScript | ✅ Yes | ✅ Yes |
| `styles.css` | Styling | ✅ Yes | ✅ Yes |

---

## Updating Firebase Rules

You already did this, but for reference:

1. Go to: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/rules

2. Make sure rules are:
   ```json
   {
     "rules": {
       "$coupleId": {
         "blessings": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```

3. Click "Publish"

---

## Troubleshooting Deployment

### Issue: 404 errors for firebase-config.js

**Solution**: Use `index.html` (not `index-new.html`) for GitHub Pages.
The deployed version has config embedded.

### Issue: Changes not showing

**Solution**:
1. Clear browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Wait 1-2 minutes for GitHub Pages to rebuild
3. Check commit was pushed: `git log --oneline -1`

### Issue: Firebase not connecting

**Solution**:
1. Check database rules are published
2. Wait 30 seconds after publishing rules
3. Check browser console for errors
4. Verify at: https://console.firebase.google.com/project/weddings1-37107/database

---

## Custom Domain (Optional)

To use your own domain (e.g., `wedding.example.com`):

1. Go to GitHub repo → Settings → Pages
2. Under "Custom domain", enter your domain
3. Add DNS records at your domain provider:
   ```
   CNAME  wedding  barpupko.github.io
   ```
4. Wait for DNS propagation (5-30 minutes)
5. Enable "Enforce HTTPS" in GitHub Pages settings

---

## Success Checklist

Your deployment is successful when:

- ✅ Site loads at https://barpupko.github.io/ShaiRavit/
- ✅ Countdown timer works
- ✅ Stars animation shows
- ✅ No console errors about firebase-config.js
- ✅ "Firebase initialized successfully" in console
- ✅ Can submit blessings
- ✅ Blessings appear floating on screen
- ✅ Blessings save to Firebase database

---

## Links

- **Live Site**: https://barpupko.github.io/ShaiRavit/
- **GitHub Repo**: https://github.com/BarPupko/ShaiRavit
- **Firebase Console**: https://console.firebase.google.com/project/weddings1-37107
- **Firebase Database**: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/data

---

**Your site is ready to share!** 🎉

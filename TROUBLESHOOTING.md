# Troubleshooting Guide

## Issue: "מערכת הברכות אינה זמינה כרגע" (Blessing system not available)

This means Firebase is not connecting properly. Follow these steps:

### Step 1: Check Firebase Database Rules ⚠️ MOST COMMON ISSUE

1. Go to: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/rules

2. **Your rules should look EXACTLY like this:**
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

3. Click **"Publish"** (very important!)

4. After publishing, **wait 30 seconds** for rules to propagate

### Step 2: Check Browser Console

1. Open your site in browser
2. Press **F12** to open Developer Tools
3. Click the **"Console"** tab
4. Look for these messages:

**✅ Good (Firebase working):**
```
Firebase initialized successfully
```

**❌ Bad (needs fixing):**
```
Firebase initialization failed
Firebase SDK not loaded
Firebase config not found
PERMISSION_DENIED
```

### Step 3: Test Firebase Connection

1. Open [test.html](test.html) in your browser
2. Click "Test Firebase Connection" button
3. Should show green success message

### Step 4: Verify firebase-config.js exists

Run this command in your project folder:
```bash
ls firebase-config.js
```

If you get "No such file", create it:
```bash
cp firebase-config.template.js firebase-config.js
```

Then edit `firebase-config.js` with your real credentials.

### Step 5: Check Network Connection

In browser Developer Tools:
1. Go to **"Network"** tab
2. Refresh the page
3. Look for requests to Firebase
4. Should see successful connections (green status codes)

---

## Issue: Buttons Not Aligned

The buttons should now all be the same width (max 450px) and centered.

**Fixed in:** [styles.css](styles.css)

If still not aligned:
1. Clear browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check browser zoom is at 100%

---

## Issue: Countdown Not Working

The countdown should work independently of Firebase.

**Check:**
1. Browser console for JavaScript errors
2. Date is correct in [script.js:156](script.js#L156): `2026-10-28T19:00:00`

---

## Quick Diagnostic Commands

### Check if all files exist:
```bash
ls index-new.html styles.css script.js firebase-config.js test.html
```

### Check Firebase rules in console:
```bash
# Open Firebase Console
start https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/rules
```

---

## Still Not Working?

### Option 1: Use Test Page
Open [test.html](test.html) - it will show exactly what's wrong

### Option 2: Check Console Messages
Copy all console messages and review:
- Red errors = problems to fix
- Yellow warnings = usually okay
- Blue/Black messages = informational

### Option 3: Verify Firebase Setup
1. Go to Firebase Console: https://console.firebase.google.com/project/weddings1-37107
2. Check "Realtime Database" is **created and active**
3. Check "Rules" tab shows your rules
4. Check "Data" tab - should see structure

---

## Common Fixes

### Fix 1: Republish Firebase Rules
Sometimes rules don't save properly:
1. Delete all rules
2. Paste the correct rules again
3. Click "Publish"
4. Wait 1 minute
5. Test again

### Fix 2: Clear Browser Cache
```
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```
Check "Cached images and files" and clear

### Fix 3: Use Incognito/Private Window
Test the site in an incognito window to rule out cache issues

---

## Success Checklist

Your site is working when you can:

- ✅ See countdown timer updating every second
- ✅ See stars twinkling in background
- ✅ Click "שלחו לנו ברכה" and form appears
- ✅ Submit a blessing successfully
- ✅ See blessing appear floating on screen
- ✅ See "Firebase initialized successfully" in console
- ✅ All buttons are same width and centered

---

## Firebase Console Links

- **Database Rules**: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/rules
- **Database Data**: https://console.firebase.google.com/project/weddings1-37107/database/weddings1-37107-default-rtdb/data
- **Project Settings**: https://console.firebase.google.com/project/weddings1-37107/settings/general

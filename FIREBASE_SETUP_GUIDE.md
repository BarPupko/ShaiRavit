# Firebase Setup Guide

## Current Issue

Your `firebase-config.js` has a placeholder `appId`. You need to get the real Web App ID from Firebase Console.

## Step-by-Step Firebase Setup

### 1. Go to Firebase Console
Open: https://console.firebase.google.com/project/weddings1-37107

### 2. Create a Web App (if not already created)

1. Click on the **⚙️ gear icon** (Project Settings) in the left sidebar
2. Scroll down to **"Your apps"** section
3. If you don't see a web app (`</>` icon), click **"Add app"** → **Web** (`</>`)
4. Give it a nickname (e.g., "Wedding Website")
5. **Check** "Also set up Firebase Hosting" (optional)
6. Click **"Register app"**

### 3. Copy the Firebase Config

After registering, you'll see the Firebase SDK configuration:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "1:109181326788334183018:web:XXXXXXXXXX"  // ← This is what you need!
};
```

### 4. Update firebase-config.js

Copy the **entire config object** and replace the content in your `firebase-config.js` file.

The important field is the `appId` - it should look like:
```
appId: "1:109181326788334183018:web:abc123def456..."
```

### 5. Set Up Realtime Database Rules

1. In Firebase Console, go to **"Realtime Database"** in the left menu
2. Click on the **"Rules"** tab
3. Replace the rules with:

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

4. Click **"Publish"**

### 6. Test Your Site

1. Open `index-new.html` in your browser
2. Open browser Developer Tools (F12)
3. Check the Console tab:
   - ✅ Should see: `"Firebase initialized successfully"`
   - ❌ If you see errors, check the appId value

4. The countdown timer should work regardless of Firebase status
5. Try submitting a blessing to test Firebase connection

## Troubleshooting

### Countdown not working?
- Open browser console (F12) and check for JavaScript errors
- Make sure all three script files are loading:
  - `firebase-app-compat.js`
  - `firebase-database-compat.js`
  - `firebase-config.js`
  - `script.js`

### Firebase errors?
- Verify the `appId` is correct (not "placeholder")
- Check that Realtime Database is enabled in Firebase Console
- Verify the database rules are published

### Blessings not appearing?
- Check Firebase Console → Realtime Database → Data
- Look for `ShaiRevital/blessings/` node
- Try submitting a test blessing and watch it appear in real-time

## Quick Test

Run this in your browser console when the page is loaded:

```javascript
// Check if Firebase is initialized
console.log('Firebase initialized:', firebaseInitialized);

// Check config
console.log('Firebase config:', firebaseConfig);

// Test countdown manually
updateCountdown();
```

## Files Status

✅ **Working without Firebase**:
- Countdown timer
- Stars animation
- All modals
- Page layout

❌ **Requires Firebase to work**:
- Blessing submission
- Floating blessing notes display
- Real-time updates

---

After following these steps, your site should work perfectly with both the countdown and Firebase blessings! 🎉

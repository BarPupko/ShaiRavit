# Setup Instructions

## Firebase Configuration Setup

The Firebase configuration has been separated into its own file for security purposes.

### First Time Setup

1. **Copy the template file**:
   ```bash
   cp firebase-config.template.js firebase-config.js
   ```

2. **Edit `firebase-config.js`** with your actual Firebase credentials:
   - Get your credentials from [Firebase Console](https://console.firebase.google.com/)
   - Go to Project Settings → General → Your apps → Web app
   - Copy the config object values

3. **The file is already in `.gitignore`** so it won't be committed to version control

### File Structure

- `firebase-config.js` - **Your actual config (NEVER commit this!)**
- `firebase-config.template.js` - Template file (safe to commit)
- `.gitignore` - Contains `firebase-config.js` to prevent accidental commits

### Security Notes

✅ **Safe to commit**:
- `firebase-config.template.js`
- `script.js`
- `index-new.html`
- `styles.css`

❌ **NEVER commit**:
- `firebase-config.js` (contains real credentials)
- `weddings1-37107-firebase-adminsdk-fbsvc-c6a3a9ecad.json` (service account key)

### Using the Same Database for Multiple Couples

The database is organized by couple name. To create a new wedding site:

1. Copy the project files
2. Update `script.js` line 4:
   ```javascript
   const blessingsRef = database.ref('CoupleNameHere/blessings');
   ```
3. Update the HTML with couple names and date
4. All sites can share the same `firebase-config.js`

### Firebase Database Rules

Set these rules in Firebase Console → Realtime Database → Rules:

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

This allows any couple path (like `ShaiRevital`, `AnotherCouple`, etc.) to have their own blessings section.


# 📘 Documentation: How to Get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google OAuth2

This guide explains how to create a Google OAuth 2.0 client and access your credentials for use in a Node.js/Express app.

---

## ✅ Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. In the top navbar, click on the project dropdown.
3. Click **"New Project"**, give it a name like `MyOAuthApp`, and click **Create**.
4. Once created, select your project from the dropdown.

---

## ✅ Step 2: Enable the Google+ API (or People API)

> ⚠️ Google has deprecated Google+ API. Use **People API** instead for getting basic profile info.

1. Go to: [APIs & Services > Library](https://console.cloud.google.com/apis/library)
2. Search for **People API**
3. Click **Enable**

---

## ✅ Step 3: Configure OAuth Consent Screen

1. Go to [APIs & Services > OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
2. Choose **External**, then click **Create**.
3. Fill out the following fields:
   - App name
   - User support email
   - Developer contact email
4. Click **Save and Continue** through Scopes and Test Users.
5. Add yourself as a test user (if in testing mode), then click **Back to Dashboard**.

---

## ✅ Step 4: Create OAuth 2.0 Credentials

1. Go to [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web Application**
4. Give it a name like `OAuth Client`
5. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:3000/auth/google/callback
   ```
6. Click **Create**

---

## ✅ Step 5: Copy the Credentials

After creation, Google will show you:

- **Client ID**
- **Client Secret**

Copy these somewhere safe.

---

## ✅ Step 6: Store Credentials in `.env` File

In the root of your Express project, create a file named `.env`:

```bash
touch .env
```

Paste your credentials:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

---

## ✅ Step 7: Load and Use in Express App

Make sure you install and use `dotenv`:

```bash
npm install dotenv
```

### Example in `auth/google.js` (ESM style):

```js
import dotenv from 'dotenv';
dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
```

If you're using CommonJS (`require`):

```js
require('dotenv').config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
```

---

## ✅ Final Output (on terminal)

When you run your app with `nodemon` or `node`:

```bash
nodemon app.js
```

You should see:

```bash
GOOGLE_CLIENT_ID: 1234567890-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET: your-client-secret
```

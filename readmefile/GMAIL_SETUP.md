# Gmail App Password Setup Guide

## 🔧 Why App Password is Required

Gmail requires an **App Password** instead of your regular password for security reasons when using applications like our booking system.

## 📧 Step-by-Step Setup

### Step 1: Access Google Account Settings
1. Go to: https://myaccount.google.com/
2. Sign in with: `cfconline1310@gmail.com`
3. Use password: `omtatsat_72`

### Step 2: Enable 2-Step Verification
1. Click on "Security" in the left sidebar
2. Find "2-Step Verification" and click on it
3. If not enabled, click "Get started" and follow the setup
4. If already enabled, proceed to Step 3

### Step 3: Generate App Password
1. Go back to "Security"
2. Find "App passwords" (under "Signing in to Google")
3. Click on "App passwords"
4. You may need to enter your password again
5. Under "Select app", choose "Mail"
6. Under "Select device", choose "Other"
7. Type "Divine Mentors" as the name
8. Click "Generate"

### Step 4: Copy the App Password
- You'll see a 16-character password like: `abcd efgh ijkl mnop`
- **Copy this password** (remove spaces if any)

### Step 5: Update Configuration
1. Open `backend/config.env`
2. Find the line: `GMAIL_APP_PASSWORD=your_gmail_app_password_here`
3. Replace `your_gmail_app_password_here` with your actual App Password
4. Save the file

### Step 6: Test the Email System
Run this command to test:
```bash
node test-email.js
```

## ✅ Expected Result
After successful setup, you should see:
```
📊 Email Test Results:
Overall Success: true
User Email: ✅ Sent
Admin Email: ✅ Sent

✅ All emails sent successfully!
```

## 🔒 Security Notes
- The App Password is specific to this application
- You can revoke it anytime from Google Account settings
- It's more secure than using your regular password
- Keep it confidential and don't share it

## 🆘 Troubleshooting
- If you get "Invalid login" error, double-check the App Password
- Make sure 2-Step Verification is enabled
- Ensure you copied the password correctly (16 characters)
- Try generating a new App Password if issues persist

## 📧 Email Templates
Once working, emails will be sent to:
- **User**: The email provided in the booking form
- **Admin**: cfconline1310@gmail.com

Both emails include complete booking details, payment information, and next steps. 
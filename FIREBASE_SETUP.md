# Firebase Setup Guide for HiveCast

## Quick Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "HiveCast Pro"
4. Follow the setup wizard

### 2. Enable Services

#### Authentication
1. Go to "Authentication" → "Get started"
2. Enable "Email/Password"
3. Enable "Google" (optional)

#### Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode"
3. Select location close to your users

#### Storage
1. Go to "Storage" → "Get started"
2. Choose "Start in test mode"
3. Select same location as Firestore

### 3. Add Web App
1. Go to "Project Settings" (gear icon)
2. Scroll to "Your apps" section
3. Click "Add app" → Web icon
4. Register app as "HiveCast Web"
5. Copy the configuration

### 4. Update Configuration

Create a `.env.local` file in your project root:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase configuration.

### 5. Security Rules (Production)

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /profiles/{profileId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    
    // Allow public read access to public projects
    match /projects/{projectId} {
      allow read: if resource.data.isPublic == true;
      allow write: if request.auth != null && request.auth.uid == resource.data.creatorId;
    }
    
    // Allow users to manage their own opportunities
    match /opportunities/{opportunityId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.posterId;
    }
    
    // Allow users to manage their own resources
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
    
    // Allow users to manage their own connections
    match /connections/{connectionId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.senderId || request.auth.uid == resource.data.receiverId);
    }
    
    // Allow users to manage their own favorites
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Testing Your Setup

1. Start your development server: `npm run dev`
2. Try to sign up with a new account
3. Check Firebase Console to see if data is being created
4. Verify authentication is working

## Troubleshooting

- **"Firebase is not properly configured"**: Check your environment variables
- **Authentication errors**: Verify Email/Password is enabled in Firebase Console
- **Database errors**: Check Firestore rules and ensure database is created
- **Storage errors**: Verify Storage is enabled and rules are set

## Demo Mode vs Firebase Mode

- **Demo Mode**: Works without Firebase, data stored in memory
- **Firebase Mode**: Real data persistence, authentication, and storage

The app automatically detects your Firebase configuration and switches between modes.

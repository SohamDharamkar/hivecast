# HiveCast - Creative Professional Platform

A comprehensive platform for creative professionals to connect, collaborate, and manage their projects. Built with React, TypeScript, and Firebase.

## Features

### 🔐 Authentication
- Email/password registration and login
- Google Sign-in integration
- Protected routes and user sessions
- Demo mode for testing without Firebase setup

### 👤 User Profiles
- Professional profiles with display pictures
- Experience, skills, and portfolio management
- Contact information and social media links
- Editable profile information

### 📁 Projects
- Create and manage projects with titles, descriptions, and tags
- Public and private project visibility
- Media upload support (images, documents, videos)
- Budget tracking and funding goals

### 🔍 Explore & Discovery
- Browse public projects from other creators
- Search and filter by skills, roles, and categories
- Save favorite projects and opportunities

### 🤝 Connect & Collaborate
- Search for professionals by skills and roles
- Send connection and collaboration requests
- Messaging system for communication
- Network building features

### 💼 Opportunities
- Post hiring opportunities with role, duration, and pay details
- Apply to opportunities with custom messages
- Track application status
- Browse available positions

### 💰 Funding
- Crowdfunding for creative projects
- Investment opportunities
- Contribution tracking
- Funding goal management

### 🎬 Production Resources
- Equipment rental listings
- Location and studio bookings
- Accommodation providers
- Resource search and filtering

### 📊 Production Management
- Project-specific task management
- Crew assignment and role tracking
- Budget management
- Timeline and deadline tracking

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Routing**: React Router DOM
- **State Management**: React Hooks & Context

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (optional - app runs in demo mode without it)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hivecast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Firebase Setup (Optional)

The app runs in **demo mode** by default, allowing you to test all features without Firebase configuration. To enable full functionality:

### Quick Setup

1. **Follow the Firebase Setup Guide**
   - See `FIREBASE_SETUP.md` for detailed instructions
   - Or follow the steps below

### Detailed Setup

#### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "HiveCast Pro")

#### 2. Enable Authentication
1. In your Firebase project, go to "Authentication" in the sidebar
2. Click "Get started"
3. Enable "Email/Password" authentication
4. Enable "Google" authentication (optional)

#### 3. Set up Firestore Database
1. Go to "Firestore Database" in the sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users

#### 4. Set up Storage
1. Go to "Storage" in the sidebar
2. Click "Get started"
3. Choose "Start in test mode" for development
4. Select the same location as your Firestore database

#### 5. Add Web App
1. Go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon
4. Register your app with a nickname (e.g., "HiveCast Web")
5. Copy the Firebase configuration object

#### 6. Update Configuration
1. Create a `.env.local` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Replace the placeholder values with your actual Firebase configuration

#### 7. Security Rules (Production)
For production deployment, update your Firestore and Storage security rules:

**Firestore Rules:**
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
    
    // Add more rules as needed
  }
}
```

**Storage Rules:**
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

## Demo Mode

When Firebase is not configured, the app runs in **demo mode** with the following features:

- ✅ All UI components work normally
- ✅ Authentication simulates login/signup
- ✅ Data is stored in memory (resets on page refresh)
- ✅ File uploads return placeholder images
- ✅ All features are fully functional for testing

To switch to full Firebase mode, follow the Firebase setup instructions above.

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── profile/        # Profile management
│   ├── projects/       # Project components
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # Firebase services
│   └── firebase.ts     # Database operations
├── types/              # TypeScript interfaces
│   └── index.ts        # Data models
├── utils/              # Utility functions
│   └── seedData.ts     # Demo data
├── firebase/           # Firebase configuration
│   └── config.ts       # Firebase setup
└── App.tsx             # Main application
```

## Key Features Explained

### Authentication System
- Uses Firebase Authentication for secure user management
- Supports email/password and Google sign-in
- Automatic session management
- Protected routes for authenticated users

### Real-time Database
- Firestore for scalable, real-time data storage
- Optimized queries for performance
- Offline support and data synchronization

### File Management
- Firebase Storage for media uploads
- Image optimization and compression
- Secure file access with authentication

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Smooth animations and transitions
- Dark theme with modern UI components

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Security Considerations

- All Firebase operations are authenticated
- Input validation on all forms
- XSS protection with React
- Secure file upload validation
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the Firebase documentation
- Review the demo mode for testing
- See `FIREBASE_SETUP.md` for Firebase setup help

## Future Enhancements

- [ ] Real-time messaging
- [ ] Video conferencing integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Payment processing integration
- [ ] Advanced search filters
- [ ] Export/import functionality

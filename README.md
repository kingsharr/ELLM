# SmartWaste ELLM - AI-Powered Waste Management Solution

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-blue.svg)](https://nextjs.org/)

SmartWaste ELLM is an innovative waste management solution that combines Artificial Intelligence and Large Language Models to revolutionize how Malaysia handles waste — from intelligent sorting to optimized collection systems.

## Key Features

- 🖼️ AI-powered waste classification using computer vision  
- 💬 LLM Chatbot for recycling education and Q&A  
- 📊 Predictive analytics for optimized waste collection  
- 🎮 Gamified user experience to encourage recycling  
- 🌱 Environmental impact tracking and reporting  
- 🔐 Firebase authentication and real-time database  

## Technologies Used

- **Frontend**: Next.js 13+, Tailwind CSS, React Icons  
- **AI/ML**: Computer Vision (CNN models), LLM Integration (OpenAI)  
- **Backend**: Firebase (Authentication, Firestore, Storage), MongoDB  
- **Analytics**: Python + Machine Learning for predictive modeling  

## Getting Started

### Prerequisites

- Node.js 18.x or later  
- npm/yarn/pnpm/bun  
- Firebase account (for backend services)  
- OpenAI API key (for LLM features)  

Install dependencies:

npm install

Create .env.local in the project root with the following content:
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

## 🔥 Firebase Setup Guide

Follow these steps to set up Firebase for the project:

### 1. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Click **"Add Project"**, and name it `ellm-project`
- Enable or skip **Google Analytics** as preferred

---

### 2. Enable Authentication

- Navigate to **Authentication > Sign-in method**
- Enable the **Email/Password** provider
- Click **Save**

---

### 3. Set Up Firestore Database

- Go to **Firestore Database > Create Database**
- Choose **Production Mode**
- Select your preferred **region**
- Click **Enable**

---

### 4. Register a Web App and Get Config

- Go to **Project Settings > General > Your Apps > Web**
- Click the **</> (Web)** icon to register a new web app
- Firebase will generate a config object that looks like this:
  ```js
  const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdefghij123456"
  };

### Set Firebase Security Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /recycling_data/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

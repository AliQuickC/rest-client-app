// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPGKPIQ4QHwhM5VZVU2NY42orf7Ai88Ds',
  authDomain: 'rss-project-postman.firebaseapp.com',
  projectId: 'rss-project-postman',
  storageBucket: 'rss-project-postman.firebasestorage.app',
  messagingSenderId: '571102150844',
  appId: '1:571102150844:web:16a5f2f963d8bf8ca1d0b9',
  measurementId: 'G-HFH1H34D2C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

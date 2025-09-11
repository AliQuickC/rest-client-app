import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBPGKPIQ4QHwhM5VZVU2NY42orf7Ai88Ds',
  authDomain: 'rss-project-postman.firebaseapp.com',
  projectId: 'rss-project-postman',
  storageBucket: 'rss-project-postman.firebasestorage.app',
  messagingSenderId: '571102150844',
  appId: '1:571102150844:web:16a5f2f963d8bf8ca1d0b9',
  measurementId: 'G-HFH1H34D2C',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

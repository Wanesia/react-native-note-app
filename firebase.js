import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBob53eeew_U9uHdwo_yWjOv-sZ947ffe8",
  authDomain: "geoo-20cfe.firebaseapp.com",
  projectId: "geoo-20cfe",
  storageBucket: "geoo-20cfe.appspot.com",
  messagingSenderId: "741356476253",
  appId: "1:741356476253:web:9fffca954c62a5141d7ab4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase}
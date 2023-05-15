import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,

  // apiKey: "AIzaSyCh2K0Tgz8XVN9cqehSgrlyIeNvBWMWadw",
  // authDomain: "market-shopping-list-c97e4.firebaseapp.com",
  // projectId: "market-shopping-list-c97e4",
  // storageBucket: "market-shopping-list-c97e4.appspot.com",
  // messagingSenderId: "70336366289",
  // appId: "1:70336366289:web:87347f891fd9e36e8ba7f0",
};

// Initialize Firebase

const appFirebase = initializeApp(firebaseConfig);
export const dbFirebase = getFirestore(appFirebase);

// export const appFirebase =
//   getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

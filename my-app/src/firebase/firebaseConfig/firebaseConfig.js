// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { apiClient } from "../../instance/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_mGf3WajG5YVmB_8GrXB5gxU3ynz6gcQ",
  authDomain: "serenify-82872.firebaseapp.com",
  projectId: "serenify-82872",
  storageBucket: "serenify-82872.appspot.com",
  messagingSenderId: "643283233370",
  appId: "1:643283233370:web:7e9a738392bd9dbe298663",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider).then((result) => {
//       const user = result.user;
//       auth.user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//         apiClient.post()
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export { storage, firebaseApp as default };

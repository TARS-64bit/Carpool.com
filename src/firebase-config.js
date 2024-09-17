// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZtCYSUS0QJ6XPXPPgmxIHvCz2o3cvK7U",
  authDomain: "carpool-1-be.firebaseapp.com",
  databaseURL: "https://carpool-1-be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carpool-1-be",
  storageBucket: "carpool-1-be.appspot.com",
  messagingSenderId: "768931868084",
  appId: "1:768931868084:web:9439994de5048e4a3b96e1",
  measurementId: "G-BG950WFXW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function StartFirebase(){
  return(getDatabase(app))
}

export const auth = getAuth(app);
export default StartFirebase;

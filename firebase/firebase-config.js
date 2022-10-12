// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAy_LiuKIhlV2kvTp2NoyCbzj354r_qPac",
	authDomain: "healthier-dev-10a1c.firebaseapp.com",
	projectId: "healthier-dev-10a1c",
	storageBucket: "healthier-dev-10a1c.appspot.com",
	messagingSenderId: "229003826641",
	appId: "1:229003826641:web:076151dea249ca8427fcf0",
};

// TODO init firebase app once only

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Initialize Firebase

export { app, auth, db };

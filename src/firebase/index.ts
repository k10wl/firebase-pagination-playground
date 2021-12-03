import firebase from "firebase/app";
import "firebase/firestore";

import config from "./config";

const firebaseConfig = config;

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = app.firestore();

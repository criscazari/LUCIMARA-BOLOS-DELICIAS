import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCMAVG_YlOOxoraN3sEF8_KUnfZElHWyA",
    authDomain: "lucimara-bolos.firebaseapp.com",
    projectId: "lucimara-bolos",
    storageBucket: "lucimara-bolos.firebasestorage.app",
    messagingSenderId: "831088528217",
    appId: "1:831088528217:web:c996bbc2a294e491e91a48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
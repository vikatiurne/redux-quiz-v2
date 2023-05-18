import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const StartFirebase = ()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ",
        authDomain: "quiz-tiurne.firebaseapp.com",
        databaseURL: "https://quiz-tiurne-default-rtdb.firebaseio.com",
        projectId: "quiz-tiurne",
        storageBucket: "quiz-tiurne.appspot.com",
        messagingSenderId: "444370065169",
        appId: "1:444370065169:web:7291bc9aa6446ac454deb0",
        measurementId: "G-L953BE5PV2"
      };
      const app = initializeApp(firebaseConfig)
      return getDatabase(app)
}

export default StartFirebase
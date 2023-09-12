import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdUEnKy_QDwIdOByVOiIAS38aS3dYoFwI",
  authDomain: "avaliacao-1bi-4per.firebaseapp.com",
  projectId: "avaliacao-1bi-4per",
  storageBucket: "avaliacao-1bi-4per.appspot.com",
  messagingSenderId: "965734072471",
  appId: "1:965734072471:web:82bb5a7a377cf6222b69d2"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };

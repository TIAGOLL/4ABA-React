import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDiuu1IgvoPi1ZsHqMLYbVcIyFGizE_NUU",
  authDomain: "db-tarefa2-4per.firebaseapp.com",
  projectId: "db-tarefa2-4per",
  storageBucket: "db-tarefa2-4per.appspot.com",
  messagingSenderId: "266824206133",
  appId: "1:266824206133:web:8ccf626268e590119c6e7c"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };

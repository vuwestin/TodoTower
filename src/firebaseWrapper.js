import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCKLkLQ-D6zR6zREFu2Kz0BNS61uf_M4J4",
    authDomain: "testingfirebaseauth-d817e.firebaseapp.com",
    databaseURL: "https://testingfirebaseauth-d817e-default-rtdb.firebaseio.com",
    projectId: "testingfirebaseauth-d817e",
    storageBucket: "testingfirebaseauth-d817e.appspot.com",
    messagingSenderId: "341128373809",
    appId: "1:341128373809:web:a8fb45946d0ac759789710"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export function writeToDb( path, uid, obj ) {
    set( ref(db, uid.toString() + "/" + path ), obj );
} 

export function readFromDb( path, uid, readFunc ) {
    const dbRef = ref(db);
    get(child(dbRef, uid.toString() + "/" + path )).then((snapshot) => {
    if (snapshot.exists()) {
        readFunc( snapshot.val() );
        console.log( snapshot.val() );
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });
}

export function deleteFromDb( path, uid ) {
    console.log("deleting path: " + path);
    remove( ref(db, uid.toString() + "/" + path) );
}

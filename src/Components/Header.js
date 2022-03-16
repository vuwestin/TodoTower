import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebaseWrapper.js"
import './styles/Header.css'
import './styles/Buttons.css'

function Header(props) {

    function handleSignIn() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            props.login({
                "uid": user.uid,
                "displayName": user.displayName,
                "isSignedIn": true
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            console.log( errorMessage);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div>
        <div className="title">
        <h1>
        ToDo Tower
        </h1>
        </div>
        <br></br>
        Log in
        <br></br>
        <button className="greenButton" onClick={handleSignIn}> Sign in with Google </button>
        </div>
    );
}

export default Header;
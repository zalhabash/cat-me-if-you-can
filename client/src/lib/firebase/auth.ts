import { auth } from "../../firebase";
import { GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";

// Google login/signup
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const user = await signInWithPopup(auth, provider);
    localStorage.setItem("uid", user.user.uid); // Stores user logging ins uid in local storage
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

// Microsoft login/signup
export async function loginWithMicrosoft() {
  const provider = new OAuthProvider("microsoft.com");
  try {
    const user = await signInWithPopup(auth, provider);
    localStorage.setItem("uid", user.user.uid); // Stores user logging ins uid in local storage
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

export async function loginWithEmail() {
  try {
    // const user = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(user);
  } catch (error) {
    console.log(error);
  }
}
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = () => auth.signInWithPopup(provider);

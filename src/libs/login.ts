import { auth } from "@/libs/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  return signOut(auth);
};

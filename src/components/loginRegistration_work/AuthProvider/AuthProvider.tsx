import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatPerson = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const out = () => {
    return signOut(auth);
  };

  const SignNow = (email:string, password : string)=>{
    setLoading(false);
   return signInWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const UnSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPerson(user);
        setLoading(false);

        // ...
      } else {
        // User is signed out
        // ...
        setPerson(null);
      }
    });
    return () => UnSub();
  }, []);
  const info = {
    person,
    loading,
    creatPerson,
    out,
    SignNow,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

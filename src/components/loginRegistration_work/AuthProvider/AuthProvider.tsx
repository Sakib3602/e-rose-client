import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth"; // ✅ correct way to import types

import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase.init";


// Step 1: Define what the AuthContext will provide
interface AuthContextType {
  person: User | null;
  loading: boolean;
  creatPerson: (email: string, password: string) => Promise<any>;
  out: () => Promise<void>;
  SignNow: (email: string, password: string) => Promise<any>;
}

// Step 2: Create the context with types
export const AuthContext = createContext<AuthContextType | null>(null);

// Step 3: Define the props type for your AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Step 4: AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [person, setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Create a new user
  const creatPerson = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login existing user
  const SignNow = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const out = () => {
    return signOut(auth);
  };

  // Watch for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setPerson(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // The value passed to the context
  const info: AuthContextType = {
    person,
    loading,
    creatPerson,
    out,
    SignNow,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

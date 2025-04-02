import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from 'firebase/auth';
  import { auth } from '../../firebase';
  
  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  
  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);
  
  const logout = () => signOut(auth);
  
  const forgotPassword = (email: string) =>
    sendPasswordResetEmail(auth, email);
  
  const getCurrentUser = () => auth.currentUser;
  
  const getToken = async () => {
    return auth.currentUser?.getIdToken();
  };
  
  export default {
    login,
    signUp,
    logout,
    forgotPassword,
    getCurrentUser,
    getToken,
  };
  
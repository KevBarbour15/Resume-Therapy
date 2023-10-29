import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGlOYOvgW93Z9w-5X-EXaOsBW1g6Jkfik",
  authDomain: "resume-therapy-e7651.firebaseapp.com",
  projectId: "resume-therapy-e7651",
  storageBucket: "resume-therapy-e7651.appspot.com",
  messagingSenderId: "762447095056",
  appId: "1:762447095056:web:38bb01c077db02f7cc7195",
  measurementId: "G-77WXMNELHZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        employee: false,
        bio: null,
      });
    }
    return null;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return "Please enter a valid email and password";
  }

  const status = await checkUserType(email);
  if (status === null) {
    return "Error checking user type. Please try again.";
  }

  if (status) {
    return "This email is associated with an employee account. Please log in at the employee portal.";
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return null;
  } catch (err) {
    console.error(err);
    return "Invalid username or password";
  }
};

const logInWithEmailAndPasswordEmployee = async (email, password) => {
  if (!email || !password) {
    return "Please enter a valid email and password";
  }

  const status = await checkUserType(email);
  if (status === null) {
    return "Error checking user type. Please try again.";
  }

  if (!status) {
    return "This email is associated with a non-employee account. Please log in on the homepage.";
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return null;
  } catch (err) {
    console.error(err);
    return "Invalid username or password";
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  if (!name || !email || !password) {
    return "Fields cannot be empty.";
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      employee: false,
      bio: null,
    });
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      connections: [],
      age: null,
    });
    return null;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPasswordEmployee = async (name, email, password) => {
  if (!name || !email || !password) {
    return "Fields cannot be empty.";
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      employee: true,
    });
    return null;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const checkUserType = async (email) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      return false;
    } else {
      const userDoc = docs.docs[0];
      const userData = userDoc.data();
      return userData.employee;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
    return null;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  logInWithEmailAndPasswordEmployee,
  registerWithEmailAndPassword,
  registerWithEmailAndPasswordEmployee,
  sendPasswordReset,
  logout,
  checkUserType,
};

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
  measurementId: "G-77WXMNELHZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

let errorText = "";
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
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

function setErrorText(text) {
  errorText = text;
}

const logInWithEmailAndPassword = async (email, password) => {
  if (email === "" || password === "") {
    setErrorText("Please enter a valid email and password");
    return;
  }
  console.log(errorText)
  let status = await checkUserType(email);
  if (status) {
    setErrorText("This email is associated with an employee account. Please log in at the employee portal.");
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    setErrorText("Invalid username or password");
    console.error(err);
    console.log("Log in failed");
  }
};

const logInWithEmailAndPasswordEmployee = async (email, password) => {
  if (email === "" || password === "") {
    setErrorText("Please enter a valid email and password");
    return;
  }
  let status = await checkUserType(email);
  if (!status) {
    setErrorText(
      "This email is associated with a non-employee account. Please log in on the homepage."
    );
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    setErrorText("Invalid username or password");
    console.log("Log in failed");
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  if (name === "" || email === "" || password === "") {
    setErrorText("Fields cannot be empty.");
    return;
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
  } catch (err) {
    console.error(err);
    setErrorText(err.message);
  }
};

const registerWithEmailAndPasswordEmployee = async (name, email, password) => {
  if (name === "" || email === "" || password === "") {
    setErrorText("Fields cannot be empty.");
    return;
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
  } catch (err) {
    console.error(err);
    setErrorText(err.message);
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
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setErrorText("Password reset email sent!");
  } catch (err) {
    console.error(err);
    setErrorText(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

function getErrorText() {
  let result = errorText;
  errorText = "";
  return result;
}

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
  getErrorText
};

import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { LoginData } from "@/stores/auth";

var firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_PROJECT_ID + ".firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const fbCreateAccount = async (
  data: LoginData,
  first: string,
  last: string
) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  console.log(response);
  if (response) {
    await fbSetUserProfile({ first, last, age: 67 });
    const profile = await fbGetUserProfile();
    return {
      user: response.user,
      profile,
    };
  } else {
    return {
      user: null,
      profile: null,
    };
  }
};

export const fbSignIn = async (data: LoginData) => {
  const response = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  console.log(response);
  return response;
};

export const fbSignOut = async () => {
  await signOut(auth);
  return true;
};

export const fbAuthStateListener = (callback: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      callback(user);
    } else {
      // User is signed out
      callback(null);
    }
  });
};

export const fbSetUserProfile = async ({
  first,
  last,
  age,
}: {
  first: string;
  last: string;
  age: number;
}) => {
  const user = auth.currentUser;
  // console.log(user);

  const ref = doc(db, "profiles", user?.uid as string);
  await setDoc(
    ref,
    {
      first,
      last,
      age,
      uid: user?.uid,
    },
    { merge: true }
  );
  return true;
};

export const fbGetUserProfile = async () => {
  const user = auth.currentUser;
  // console.log(user);

  const ref = doc(db, "profiles", user?.uid as string);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return {
      ...docSnap.data(),
      uid: user?.uid,
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!", user?.uid);
    return null;
  }
};

export const queryObjectCollection = async ({
  collectionName,
}: {
  collectionName: string;
}) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const results: any[] = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

export const fbCollectionListener = (collectionName: string, callback: any) => {
  const unsubscribe = onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      // ...
      console.log("Listening To Collection: " + collectionName, snapshot);
      const results: any[] = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(results);
    },
    (error) => {
      // ...
      console.log("Error Listening To Collection: " + collectionName, error);
    }
  );
};

export { app, db, auth };

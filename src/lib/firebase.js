import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCttQgWJlKOqMiLroiUu96Ll-4OXF1qhX4",
  authDomain: "todo-app-1-2022-itssinjapanese.firebaseapp.com",
  projectId: "todo-app-1-2022-itssinjapanese",
  storageBucket: "todo-app-1-2022-itssinjapanese.appspot.com",
  messagingSenderId: "400382809474",
  appId: "1:400382809474:web:92718a3fefc1c5d65dab9b",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const db = firebase.firestore();
export const getItemsFromFirebase = async () => {
  try {
    const snapshot = await db.collection("todos").get();
    const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addToFirebase = async (item) => {
  try {
    const todoCollection = db.collection("todos");
    await todoCollection.add(item);
  } catch (error) {
    console.log(error);
  }
};
export const updateItemFromFirebase = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (error) {
    console.log(error);
  }
};

export const clearItemsFromFirebase = async (item) => {
  try {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef.delete();
  } catch (error) {
    console.log(error);
  }
};
export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await db.collection("users").doc(uid).set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
};

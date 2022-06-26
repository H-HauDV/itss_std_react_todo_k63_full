import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
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
const db = firebase.firestore();
export const addToFirebase= async (item) => {
  try {
    const todoCollection = db.collection("todos");
    await todoCollection.add(item);
  } catch (error) {
    console.log(error);
  }
};

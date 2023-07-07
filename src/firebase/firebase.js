import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCQxCwuMPFrs2zg_aDTi3fKZEuNUSUfrKE",
  authDomain: "shoppingmall-84559.firebaseapp.com",
  projectId: "shoppingmall-84559",
  storageBucket: "shoppingmall-84559.appspot.com",
  messagingSenderId: "682864869137",
  appId: "1:682864869137:web:6e1606358125e1816c56b0",
  measurementId: "G-DWHTPZMBTM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

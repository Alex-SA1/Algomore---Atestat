// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCsIjRWDYYeaXK81zzxu_xYq06_4O6KKls',
  authDomain: 'algomore-52985.firebaseapp.com',
  databaseURL: 'https://algomore-52985-default-rtdb.firebaseio.com',
  projectId: 'algomore-52985',
  storageBucket: 'algomore-52985.appspot.com',
  messagingSenderId: '1051863363278',
  appId: '1:1051863363278:web:60d3117f4113177c23aa9f',
  measurementId: 'G-JQ3G9Z45MP'
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export
{ auth,
  db,
  app
}
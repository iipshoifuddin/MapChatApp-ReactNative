import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyAzDwUqXiQSX4-REnYJDggk4kUTckFEY1g",
    authDomain: "fir-14januari.firebaseapp.com",
    databaseURL: "https://fir-14januari.firebaseio.com",
    projectId: "fir-14januari",
    storageBucket: "fir-14januari.appspot.com",
    messagingSenderId: "407610064851",
    appId: "1:407610064851:web:0c9c405e483ef45a95f926",
    measurementId: "G-MC0974NSK7"
  };

firebase.initializeApp(firebaseConfig);

//firebase.firestore().settings(settings);

export default firebase;
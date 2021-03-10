import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAxDPgTa9wfxp8G41PvHR4bOLLV7GDY7mg',
    authDomain: 'review-app-9f9f2.firebaseapp.com',
    databaseURL: 'https://review-app-9f9f2.firebaseio.com',
    projectId: 'review-app-9f9f2', 
    storageBucket: 'review-app-9f9f2.appspot.com',
    messagingSenderId: '147057011392',
    appId: '1:147057011392:web:0173f41d52c59b535c5b25'
};

let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

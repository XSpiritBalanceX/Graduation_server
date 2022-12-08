const {initializeApp}=require('firebase/app');
const {getStorage}=require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyBCUeoIxjoaErqi8SU5qI0g-fe3vgq-mo0",
    authDomain: "reviewer-3fa14.firebaseapp.com",
    projectId: "reviewer-3fa14",
    storageBucket: "reviewer-3fa14.appspot.com",
    messagingSenderId: "227615914509",
    appId: "1:227615914509:web:8355b2f519fec5b9c0f344",
    measurementId: "G-W6DK5F4W8X"
};

const firebaseApp=initializeApp(firebaseConfig);

module.exports=getStorage(firebaseApp);



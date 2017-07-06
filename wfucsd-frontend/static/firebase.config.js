 import Firebase from 'firebase'


 const config = {
     apiKey: "AIzaSyDxUiUJpcQ8gLAjpJWXTQa9qov712j58m0",
     authDomain: "wfucsd.firebaseapp.com",
     databaseURL: "https://wfucsd.firebaseio.com",
     projectId: "wfucsd",
     storageBucket: "wfucsd.appspot.com",
     messagingSenderId: "111487561397"
 }

 export const firebaseApp = Firebase.initializeApp(config)
 export const database = firebaseApp.database()
import app from 'firebase/app';
// import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBaap_CqdEY6AhgfoeSdmFJZS2Z1PsFtFg",
    authDomain: "upcycle-floral.firebaseapp.com",
    databaseURL: "https://upcycle-floral.firebaseio.com",
    projectId: "upcycle-floral",
    storageBucket: "upcycle-floral.appspot.com",
    messagingSenderId: "218819799946"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      // this.auth = app.auth();
      this.db = app.database();
    }

    // Uncomment everything to include authorization

    // // *** Auth API ***
    // doCreateUserWithEmailAndPassword = (email, password) =>
    //   this.auth.createUserWithEmailAndPassword(email, password);
    //
    // doSignInWithEmailAndPassword = (email, password) =>
    //   this.auth.signInWithEmailAndPassword(email, password);
    //
    // doSignOut = () => this.auth.signOut();
    //
    // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    //
    // doPasswordUpdate = password =>
    //   this.auth.currentUser.updatePassword(password);

    arrangements = () => this.db.ref('arrangements');
  }

  export default Firebase;

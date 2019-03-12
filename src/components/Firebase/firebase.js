import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBaap_CqdEY6AhgfoeSdmFJZS2Z1PsFtFg",
  authDomain: "upcycle-floral.firebaseapp.com",
  databaseURL: "https://upcycle-floral.firebaseio.com",
  projectId: "upcycle-floral",
  storageBucket: "upcycle-floral.appspot.com",
  messagingSenderId: "218819799946"
};

//https://console.firebase.google.com/u/1/project/upcycle-floral/database/data/

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }
  listings = () => this.db.ref('arrangements');
  listing = (id) => this.db.ref('arrangements/' + id);
}

export default Firebase;

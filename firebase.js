import firebase from 'firebase/app'

import "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyABi-RxQyqBuHiYPGm525oFtU2lWGK3sds',
  authDomain: 'inforealm-web-3f978.firebaseapp.com',  
  projectId: 'inforealm-web-3f978',
  storageBucket: 'inforealm-web-3f978.appspot.com',
  messagingSenderId: '190525470177',
  appId: '1:190525470177:android:37d69ceada226d25600ea0',
  measurementId: 'G-NLKGYPRL2W',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()


const provider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'})
fbProvider.setCustomParameters({
  'display': 'popup'
});

export {
  auth,
  provider,
  fbProvider,  
}
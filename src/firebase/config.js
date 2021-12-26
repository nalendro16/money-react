import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAbjaaB1GFkxf-XF5G_zjgpqSkoRDyKmmw',
  authDomain: 'money-react-ec529.firebaseapp.com',
  projectId: 'money-react-ec529',
  storageBucket: 'money-react-ec529.appspot.com',
  messagingSenderId: '84743643833',
  appId: '1:84743643833:web:d06d7383587506ca9f7168',
}

// initialize firebase
firebase.initializeApp(firebaseConfig)

// inite service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timeStamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timeStamp }

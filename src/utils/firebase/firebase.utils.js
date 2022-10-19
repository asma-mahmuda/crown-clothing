import { initializeApp } from "firebase/app";
import { getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwcnjfs1-Klhms9pNu_XIJ4CZ1Fr7afdA",
  authDomain: "crwn-clothing-db-6a330.firebaseapp.com",
  projectId: "crwn-clothing-db-6a330",
  storageBucket: "crwn-clothing-db-6a330.appspot.com",
  messagingSenderId: "1044029787644",
  appId: "1:1044029787644:web:edd9ae2440dbbd4fbcf679"
};

const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInAuthUserWithEmailAndPassword(auth, email, password);
  };
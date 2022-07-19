//SignInWithRedirect is a commented code
// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth';
import SignUp from '../../components/sign-up-form/sign-up-form.component';
import { 
  // auth,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  // signInWithGoogleRedirect 
} from "../../utils/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  // useEffect(() => {
  //   (async () => {
  //     const response = await getRedirectResult(auth);
  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   })();
  // }, [])

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Googl Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Googl Redirect</button> */}
      <SignUp />
    </div>
  )
}

export default SignIn
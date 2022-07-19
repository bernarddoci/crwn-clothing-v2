import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { 
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase.utils"

import './sign-in.style.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log("❌⭕❌⭕❌⭕❌⭕ ~ file: log-in-form.component.jsx ~ line 33 ~ signInWithGoogle ~ user", user)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
      console.log("❌⭕❌⭕❌⭕❌⭕ ~ file: log-in-form.component.jsx ~ line 35 ~ onSubmit ~ user", user)
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log("❌⭕❌⭕❌⭕❌⭕ ~ file: sign-in-form.component.jsx ~ line 39 ~ onSubmit ~ error", error)
      }
    }
  } 

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className="log-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput 
          label="Email"
          inputOptions={{
            required: true, 
            value: email, 
            name: 'email', 
            onChange: handleChange,
            type: 'email' 
          }}
        />

        <FormInput 
          label="Password"
          inputOptions={{
            required: true, 
            value: password, 
            name: 'password', 
            onChange: handleChange,
            type: 'password' 
          }}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
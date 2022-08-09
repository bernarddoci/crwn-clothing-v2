import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

import { LogInContainer, ButtonsContainer } from './sign-in.styles';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  }

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
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
    <LogInContainer>
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

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </LogInContainer>
  )
}

export default SignIn
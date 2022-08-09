import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';
import { signUpStart } from '../../store/user/user.action';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const resetFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName))
      resetFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log("❌⭕❌⭕❌⭕❌⭕ ~ file: sign-up.component.jsx ~ line 34 ~ handleSubmit ~ error", error)
      
    }
  }

  return (
    <SignUpContainer>
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          inputOptions={{
            required: true, 
            value: displayName, 
            name: 'displayName', 
            onChange: handleChange,
            type: 'text' 
          }}
        />

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

        <FormInput 
          label="Confirm Password"
          inputOptions={{
            required: true, 
            value: confirmPassword, 
            name: 'confirmPassword', 
            onChange: handleChange,
            type: 'password' 
          }}
        />
        <Button type="submit">Sing up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUp
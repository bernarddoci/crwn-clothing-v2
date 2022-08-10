import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth } from '../utils/firebase.utils';
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTIONS_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITITAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const [ {currentUser}, dispatch] = useReducer(userReducer, INITITAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user))
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
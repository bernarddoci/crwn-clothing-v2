import { CATEGORIES_ACTION_TYPE } from "./categories.types";

const INITITAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (state = INITITAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true }
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload
      }
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    default: 
      return state
  }
}
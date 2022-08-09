import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
// import { addCollectionAndDocuments, getCategoryiesAndDocuments } from '../../utils/firebase.utils.js';

export const fetchCategoriesStart = () => 
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) => 
createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray)

export const fetchCategoriesFailed = (error) => 
createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

//It's used for thunk middleware
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoryArray = await getCategoryiesAndDocuments('categories')
//     dispatch(fetchCategoriesSuccess(categoryArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// }

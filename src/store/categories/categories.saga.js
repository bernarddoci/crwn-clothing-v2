import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoryiesAndDocuments } from '../../utils/firebase.utils.js';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action.js';

import { CATEGORIES_ACTION_TYPE } from './categories.types.js';

export function* fetchCategoriesAsync() {
  try {
    const categoryArray = yield call(getCategoryiesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoryArray))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}
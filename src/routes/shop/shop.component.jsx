import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/categories.action.js';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}/>
      <Route path=":category" element={<Category />}/>
    </Routes>
  )
}

export default Shop
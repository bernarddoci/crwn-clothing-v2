import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments, getCategoryiesAndDocuments } from '../utils/firebase.utils.js';

// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    // Add data to db  
    // addCollectionAndDocuments('categories', SHOP_DATA);
    const getCategories = async () => {
      const categoryMap = await getCategoryiesAndDocuments()
      setCategoriesMap(categoryMap);
    }

    getCategories();
  }, [])

  const value = { categoriesMap };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
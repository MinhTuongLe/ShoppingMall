import { createSlice } from "@reduxjs/toolkit";
import {BASE_URL} from '../utils/apiURL'

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    catAllProducts: [],
    catEachProducts: [],
  },
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
    setCategoriesAllProducts(state, action) {
      state.catAllProducts.push(action.payload);
    },
    setCategoriesEachProducts(state, action) {
      state.catEachProducts = action.payload;
    },
  },
});

export const {setCategories, setCategoriesAllProducts, setCategoriesEachProducts } = CategorySlice.actions;
export default CategorySlice.reducer;

export const fetchCategories = () => {
    return async function fetchCategories(dispatch) {
        try {
            const response = await fetch(`${BASE_URL}categories`)
            const data = await response.json()
            dispatch(setCategories(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchProductsByCategory = (categoryId, type) => {
  return async function fetchProductsByCategory(dispatch) {
    try {
      const response = await fetch(`${BASE_URL}categories/${categoryId}/products`);
      const data = await response.json();
      if (type === 'ALL') {
        dispatch(setCategoriesAllProducts(data.slice(0, 5)))
      }
      if (type === 'EACH') {
        dispatch(setCategoriesEachProducts(data.slice(0, 10)))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
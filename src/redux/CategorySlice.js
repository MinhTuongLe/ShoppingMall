import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    catAllProducts: [],
    catAllProductsStatus: STATUS.IDLE,
    catEachProducts: [],
    catEachProductsStatus: STATUS.IDLE,
    searchText: ""
  },
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    searchFilterChangeCategory(state, action) {
      state.searchText = action.payload;
    },
    setCategoriesAllProducts(state, action) {
      state.catAllProducts.push(action.payload);
    },
    setCategoriesEachProducts(state, action) {
      state.catEachProducts = action.payload;
    },
    setCategoriesAllProductsStatus(state, action) {
      state.catAllProductsStatus = action.payload;
    },
    setCategoriesEachProductsStatus(state, action) {
      state.catEachProductsStatus = action.payload;
    },
  },
});

export const {
  setCategories,
  setStatus,
  setCategoriesAllProducts,
  setCategoriesEachProducts,
  setCategoriesAllProductsStatus,
  setCategoriesEachProductsStatus,
  searchFilterChangeCategory
} = CategorySlice.actions;
export default CategorySlice.reducer;

export const fetchCategories = () => {
  return async function fetchCategories(dispatch) {
    dispatch(setStatus(STATUS.LOADING));

    try {
      const response = await fetch(`${BASE_URL}categories`);
      const data = await response.json();
      dispatch(setCategories(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

export const fetchProductsByCategory = (categoryId, type, searchText) => {
  return async function fetchProductsByCategory(dispatch) {
    if(type === 'ALL') dispatch(setCategoriesAllProductsStatus(STATUS.LOADING));
    if(type === 'EACH') dispatch(setCategoriesEachProductsStatus(STATUS.LOADING));
    try {
      const response = await fetch(
        `${BASE_URL}categories/${categoryId}/products`
      );
      const data = await response.json();
      if (type === "ALL") {
        dispatch(setCategoriesAllProducts(data.slice(0, 5)));
        dispatch(setCategoriesAllProductsStatus(STATUS.IDLE));

      }
      if (type === "EACH") {
        dispatch(setCategoriesEachProducts(data.filter(product => (product.title.toLowerCase()).includes(searchText.toLowerCase()))));
        dispatch(setCategoriesEachProductsStatus(STATUS.IDLE));

      }
    } catch (error) {
      dispatch(setCategoriesAllProductsStatus(STATUS.ERROR));

    }
  };
};

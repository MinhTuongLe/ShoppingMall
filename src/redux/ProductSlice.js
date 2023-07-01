import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    searchText: ""
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    searchFilterChange (state, action) {
      state.searchText = action.payload;
    },
  },
});

export const { setProducts, setStatus, searchFilterChange } = ProductSlice.actions;
export default ProductSlice.reducer;

export const fetchProducts = (searchText) => {
  return async function fetchProducts(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}products`);
      const data = await response.json();
      dispatch(setProducts(data.filter(product => (product.title.toLowerCase()).includes(searchText.toLowerCase()))));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

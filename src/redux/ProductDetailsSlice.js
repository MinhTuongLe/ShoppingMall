import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const ProductDEtailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProductDetailsData(state, action) {
      state.data = action.payload;
    },
    setProductDetailsStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProductDetailsData, setProductDetailsStatus } =
  ProductDEtailsSlice.actions;
export default ProductDEtailsSlice.reducer;

export const fetchProductById = (productId) => {
  return async function fetchProducts(dispatch) {
    dispatch(setProductDetailsStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}products/${productId}`);
      const data = await response.json();
      dispatch(setProductDetailsData(data));
      dispatch(setProductDetailsStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setProductDetailsStatus(STATUS.ERROR));
    }
  };
};

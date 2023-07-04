import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    searchText: "",
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    searchFilterChange(state, action) {
      state.searchText = action.payload;
    },
    sortProducts(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [...products];

      if (sort !== "latest") {
        if (sort === "lowest-price") {
          tempProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "highest-price") {
          tempProducts.sort((a, b) => b.price - a.price);
        } else if (sort === "a-z") {
          tempProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "z-a") {
          tempProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
      }
      state.data = tempProducts;
    },
  },
});

export const { setProducts, setStatus, searchFilterChange, sortProducts } =
  ProductSlice.actions;
export default ProductSlice.reducer;

export const fetchProducts = (searchText) => {
  return async function fetchProducts(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}products`);
      const data = await response.json();
      dispatch(
        setProducts(
          data.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

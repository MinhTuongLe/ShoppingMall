import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        data:[],
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload
        }
    }
})

export const {setProducts} = ProductSlice.actions;
export default ProductSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProducts(dispatch) {
        try {
            const response = await fetch(`${BASE_URL}products`)
            const data = await response.json()
            dispatch(setProducts(data))
        } catch (error) {
            console.log(error)
        }
    }
}
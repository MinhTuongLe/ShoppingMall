import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
const ProductDEtailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        data: []
    },
    reducers: {
        setProductDetailsData (state, action) {
            state.data = action.payload
        }
    }
})

export const {setProductDetailsData} = ProductDEtailsSlice.actions;
export default ProductDEtailsSlice.reducer;

export const fetchProductById = (productId) => {
    return async function fetchProducts(dispatch) {
        try {
            const response = await fetch(`${BASE_URL}products/${productId}`)
            const data = await response.json()
            dispatch(setProductDetailsData(data))
        } catch (error) {
            console.log(error)
        }
    }
}
import { createSlice } from "@reduxjs/toolkit";
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
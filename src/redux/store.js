import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';
import ProductDetailsSlice from './ProductDetailsSlice';

const store = configureStore({
    reducer: {
        category: CategorySlice,
        product: ProductSlice,
        productDetails: ProductDetailsSlice
    }
})

export default store;
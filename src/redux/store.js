import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';

const store = configureStore({
    reducer: {
        category: CategorySlice,
        product: ProductSlice
    }
})

export default store;
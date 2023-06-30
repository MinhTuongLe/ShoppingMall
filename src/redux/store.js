import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';
import ProductDetailsSlice from './ProductDetailsSlice';
import CartSlice from './CartSlice';

const store = configureStore({
    reducer: {
        category: CategorySlice,
        product: ProductSlice,
        productDetails: ProductDetailsSlice,
        cart: CartSlice
    }
})

export default store;
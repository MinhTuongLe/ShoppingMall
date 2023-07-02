import {configureStore} from '@reduxjs/toolkit'
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';
import ProductDetailsSlice from './ProductDetailsSlice';
import CartSlice from './CartSlice';
import AuthSlice from './AuthSlice';
import ContactSlice from './ContactSlice';

const store = configureStore({
    reducer: {
        category: CategorySlice,
        product: ProductSlice,
        productDetails: ProductDetailsSlice,
        cart: CartSlice,
        auth: AuthSlice,
        contact: ContactSlice
    },
})

export default store;
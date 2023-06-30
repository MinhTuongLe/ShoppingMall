import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () =>{
    let cart = localStorage.getItem('cart')
    return cart ? JSON.parse(localStorage.getItem('cart')) : []
}

const storeToLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchFromLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: 1000
    },
    reducers: {
        addToCart(state, action) {
            const tempCart = state.data.find(item =>item.id === action.payload.id);
            if (tempCart) {
                const tempCart = state.data.map(item => {
                    if (item.id === action.payload.id) {
                        let newQuantity = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQuantity*item.price;
                        return {...item, quantity: newQuantity, totalPrice: newTotalPrice}
                    }
                })
                state.data = tempCart
                storeToLocalStorage(state.data)
            } else {
                state.data.push(action.payload)
                storeToLocalStorage(state.data)
            }
        },
        removeFromCart(state, action) {
            const tempCart = state.data.filter(item => item.id !== action.payload)
            state.data = tempCart;
            storeToLocalStorage(state.data)
        },
        clearCart (state) {
            state.data = []
            storeToLocalStorage(state.data)
        },
        modifyCartQuantity (state, action) {
            const tempCart = state.data.map (item => {
                if (item.id === action.payload.id) {
                    let tempQuantity = item.quantity
                    let tempTotalPrice = item.totalPrice
                    if (action.payload.type === "INCREASE") {
                        tempQuantity++;
                        tempTotalPrice = tempQuantity * item.price
                    } 
                    if (action.payload.type === "DECREASE") {
                        tempQuantity--;
                        if (tempQuantity < 1) tempQuantity=1;
                        tempTotalPrice = tempQuantity * item.price
                    } 
                    return {...item, quantity: tempQuantity, totalPrice: tempTotalPrice}
                } else {
                    return item
                }
            })
            state.data = tempCart
            storeToLocalStorage(state.data)
        },
        getCartTotal(state) {
            state.totalAmount = state.data.reduce ((cartTotal, cartItem) => {
                return cartTotal+=cartItem.totalPrice
            }, 0)
            state.totalItems = state.data.length
        }
    }
})

export const {addToCart, removeFromCart, clearCart, modifyCartQuantity, getCartTotal} = CartSlice.actions;
export default CartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  cart:[],
  userEmail:""
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value =true;
      
        localStorage.setItem('items', JSON.stringify(state.value));
      
    },
    decrement: (state) => {
      state.value = false;
       localStorage.setItem('items', JSON.stringify(state.value));
    },
    addToCart: (state, action) => {
    
      
      console.log(action.payload);
      alert("added to cart");
      
      state.cart = [...state.cart,action.payload]
      
    },
    removeCartItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeItem;
    },
    userEmailFunction: (state, action) =>{
      state.userEmail = action.payload;
      console.log(state.userEmail);
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, addToCart, removeCartItem, userEmailFunction } = counterSlice.actions

export default counterSlice.reducer
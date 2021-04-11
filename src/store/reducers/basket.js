import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false
};


export const basketSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addBasket: (state, action) => {
      state.list.push({ id: action.payload, quantity: 1})
    },
    removeBasket: (state, action) => {
      let index = state.list.findIndex((el)=>{
        return el.id === action.payload
      })
      state.list.splice(index,1)
    },
    increaseQuantity: (state, action) => {
      let index = state.list.findIndex((el)=>{
        return el.id === action.payload
      })
      state.list[index].quantity++
    },
    lesseningQuantity: (state, action) => {
      let index = state.list.findIndex((el)=>{
        return el.id === action.payload
      })
      if(state.list[index].quantity > 1){
        state.list[index].quantity--
      }else{
        state.list.splice(index,1)
      }
    }
  }
});

export const { addBasket, removeBasket, lesseningQuantity, increaseQuantity } = basketSlice.actions;

export default basketSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: ( localStorage.getItem('basket') )? JSON.parse(localStorage.getItem('basket')) :[],
  loading: false
};

const setLocalStorage = list => {
  let data = JSON.stringify(list)
  localStorage.setItem('basket', data)
}

export const basketSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addBasket: (state, action) => {
      state.list.push({ id: action.payload, quantity: 1})
      setLocalStorage(state.list)
    },
    removeBasket: (state, action) => {
      let index = state.list.findIndex((el)=>{
        return el.id === action.payload
      })
      state.list.splice(index,1)
      setLocalStorage(state.list)
    },
    removeBasketAll: (state, action) => {
      state.list = []
      setLocalStorage(state.list)
    },
    increaseQuantity: (state, action) => {
      let index = state.list.findIndex((el)=>{
        return el.id === action.payload
      })
      state.list[index].quantity++
      setLocalStorage(state.list)
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
      setLocalStorage(state.list)
    }
  }
});

export const { addBasket, removeBasket, lesseningQuantity, increaseQuantity, removeBasketAll } = basketSlice.actions;

export default basketSlice.reducer;

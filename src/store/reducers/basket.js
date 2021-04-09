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
      state.list.push(action.payload)
    },
    removeBasket: (state, action) => {
        let index = state.list.indexOf(action.payload)
        state.list.splice(index)
    }
  }
});

export const { addBasket, removeBasket } = basketSlice.actions;

export default basketSlice.reducer;

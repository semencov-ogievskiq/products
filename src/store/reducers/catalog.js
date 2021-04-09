import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  list: [],
  loading: false
};

export const getCatalog = createAsyncThunk(
  'catalog/getCatalog',
  async (data) => {
    try{
        let res = await axios.get('http://127.0.0.1:5500/catalog.json')
        console.log('d')
        return res.data
    }catch( err ){
        console.log( err )
        return []
    }
  }
);

export const counterSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.status = false;
        state.list = [...action.payload]
      });
  },
});

export default counterSlice.reducer;

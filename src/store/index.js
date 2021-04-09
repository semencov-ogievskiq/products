import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './reducers/catalog.js'
import basketReducer from './reducers/basket.js'
export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        basket: basketReducer
    },
  });
  
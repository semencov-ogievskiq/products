import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './reducers/catalog'
import basketReducer from './reducers/basket'
import  clientReducer, { checkAuth }  from './reducers/client'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'

export const history = createBrowserHistory()

export const store = configureStore({
    reducer: {
        client: clientReducer, 
        catalog: catalogReducer,
        basket: basketReducer,
        router: connectRouter(history)
    },
    middleware: ( getDefaultMiddleware ) => ( getDefaultMiddleware().concat(checkAuth,routerMiddleware(history)))
  });
  
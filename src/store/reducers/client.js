import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'
import { push } from 'connected-react-router'

const initialState = {
  token: ( localStorage.getItem('token') )? localStorage.getItem('token') : '',
  fetch: false,
  fetch_progress: null,
  fetch_err: null,
  client: {}
};

export const clientReducer = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setToken(state, action){
      state.token = action.payload
      localStorage.setItem('token', state.token) 
    },
    removeToken(state, action){
      state.token = ''
      localStorage.setItem('token', state.token) 
    },
    setClientData(state, action){
      state.client = action.payload
    },
    removeClientData(state, action){
      state.client = {}
    },
    setFetch(state, action){
      state.fetch = true
      state.fetch_err = null
      state.fetch_progress = action.payload
    },
    removeFetch(state, action){
      state.fetch = false
      state.fetch_progress = null
      state.fetch_err = (action.payload)? action.payload : null
    }
  }
})

export const { setToken, removeToken, setClientData, removeClientData, setFetch, removeFetch } = clientReducer.actions;

export default clientReducer.reducer;

export const checkAuth = store => next => action => {
  if( action.type === "@@router/LOCATION_CHANGE" ){
    const token = store.getState().client.token
    if( token ){
      store.dispatch(getClientData())
      next(action)
    }else{
      let route = config.routers.find(el => ( el.path === action.payload.location.pathname ))
      if ( route.auth ){
        setTimeout(()=>{store.dispatch(push('/'))},1) // Без timeout не срабатывает редирект
      }else{
        next(action)
      }
    }
    next(action)  

  }else{
    next(action)
  }
}

export const login = ( mail, password, callback ) => async dispatch => {
  try{
    let options = {
      onUploadProgress: e => { dispatch( setFetch( parseInt( Math.round( ( e.loaded / e.total ) * 100) ))) }
    }
    let res = await axios.post('http://localhost:80/login',{ mail:mail, password:password }, options)

    if( res.status === 400 && res.data.err ) throw new Error(res.data.err)
    if( !res.data.token ) throw new Error('Ошибка авторизации')

    dispatch(setToken(res.data.token))
    dispatch(getClientData())
    dispatch(removeFetch())
  }catch( err ){
    console.log( err )
    dispatch(removeFetch(err.message))
  }
  callback()
}

export const getClientData = () => async (dispatch,getState) => {
  try{
    const token = getState().client.token
    if( !token ) throw new Error('Пользователь не авторизован')
    let options = {
      headers: {'Authorization' : 'Bearer ' + token }
    }
    let res = await axios.get('http://localhost:80/clientData',options)
    dispatch(removeClientData())
    dispatch(setClientData(res.data.client))
  }catch( err ){
    console.log( err )
    dispatch(removeClientData())
    dispatch(removeToken())
  }
}

export const logout = () => dispatch => {
  dispatch(removeToken())
  dispatch(removeClientData())
}
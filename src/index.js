import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store, history } from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { ConnectedRouter } from 'connected-react-router'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

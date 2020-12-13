import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
 import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { initialize } from 'fireactive'
import store from './redux';

const queryCache = new QueryCache()

initialize({
  databaseURL: process.env.DATABASE_URL
})

const app = (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactQueryCacheProvider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

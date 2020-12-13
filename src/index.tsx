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
  apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
  authDomain: "included-m.firebaseapp.com",
  databaseURL: "https://included-m-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "included-m",
  storageBucket: "included-m.appspot.com",
  messagingSenderId: "120205799819",
  // @ts-ignore
  appId: "1:120205799819:web:7b8b7a05d2abf5b4e87f8e",
  measurementId: "G-E602LNZPCN"
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

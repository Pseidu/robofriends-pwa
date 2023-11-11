import React from 'react';
import ReactDOM from 'react-dom/client';

/******* createStore: para crear un store (estado) */
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';

/*******  Provider: componente que permite hacer visible el store (estado) a todos nuestro árbol
 * de componentes (sin pasarlo de uno a otro como prop) */
import { Provider } from 'react-redux';

/******* redux-logger: Middleware de Redux para facilitar el depurado.
 * Informa por consola de qué acción y qué estados (previo y posterior a la acción)
 * tenemos */
import { createLogger } from 'redux-logger';

/******* Thunk: Middleware para trabajar con peticiones síncronas (si no, se perderían) */
import thunk from 'redux-thunk';

import { searchRobots, requestRobots } from './reducers';
import './index.css';
import App from './containers/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'tachyons';

const logger = createLogger();
const rootReducer = combineReducers({searchRobots, requestRobots})
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

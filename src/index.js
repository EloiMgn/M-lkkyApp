import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './reset.css'
import App from './components/App/App';
// import StoreProvider from './utils/Provider/Provider'
import { Provider } from "react-redux";
// on importe le store
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

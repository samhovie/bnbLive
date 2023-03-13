import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
// frontend/src/index.js
// ... other imports
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as ReactDOMClient from 'react-dom/client';

const store = configureStore();
const root = ReactDOMClient.createRoot (document.getElementById ("root"));

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

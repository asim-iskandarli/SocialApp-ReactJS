import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {  ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './redux';
import { BrowserRouter } from 'react-router-dom';
import client from './graphql'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ApolloProvider client={client}>
    // <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    // </Provider>
  // </ApolloProvider>
);

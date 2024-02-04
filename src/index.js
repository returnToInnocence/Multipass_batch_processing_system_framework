import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './containers/App';
import store from './store/store';

import './semantic-ui.min.css';


const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

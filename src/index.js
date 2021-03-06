import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import portfolioReducer from './store/reducers/portfolio';


const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

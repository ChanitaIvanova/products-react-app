import { createStore, applyMiddleware } from 'redux';
import { Products } from './products/products';
import thunk from 'redux-thunk';

const store = createStore(Products, applyMiddleware(thunk));
export default store;

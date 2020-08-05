import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Products } from './products/products';
import { Permissions } from './permissions/permissions';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        products: Products,
        permissions: Permissions,
    }),
    applyMiddleware(thunk)
);
export default store;

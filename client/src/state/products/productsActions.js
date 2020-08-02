import { ADD_PRODUCTS } from '../actionTypes';

export const addProducts = (products) => ({
    type: ADD_PRODUCTS,
    payload: products
});

import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS } from '../actionTypes';

export const receiveProducts = (products) => ({
    type: RECEIVE_PRODUCTS,
    payload: products,
});

export const requestProducts = () => ({
    type: REQUEST_PRODUCTS,
});

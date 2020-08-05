import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from '../actionTypes';

export const Products = (
    state = { products: [], areLoading: false },
    action
) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state, products: action.payload, areLoading: false };
        case REQUEST_PRODUCTS:
            return { ...state, areLoading: true };
        default:
            return state;
    }
};

import { Products } from './products';
import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS } from '../actionTypes';

describe('Products', () => {
    it('should return the initial state', () => {
        expect(Products(undefined, {})).toEqual({
            products: [],
            areLoading: false,
        });
    });

    it('should handle RECEIVE_PRODUCTS', () => {
        const products = [
            {
                id: 1,
                name: 'Iron',
                price: 20,
                currency: 'USD',
            },
            {
                id: 2,
                name: 'TV',
                price: 500,
                currency: 'USD',
            },
        ];
        expect(
            Products(undefined, {
                type: RECEIVE_PRODUCTS,
                payload: products,
            })
        ).toEqual({ products: products, areLoading: false });

        expect(
            Products(
                { products: [], areLoading: true },
                {
                    type: RECEIVE_PRODUCTS,
                    payload: products,
                }
            )
        ).toEqual({ products: products, areLoading: false });
    });

    it('should handle REQUEST_PRODUCTS', () => {
        const products = [
            {
                id: 1,
                name: 'Iron',
                price: 20,
                currency: 'USD',
            },
            {
                id: 2,
                name: 'TV',
                price: 500,
                currency: 'USD',
            },
        ];
        expect(
            Products(undefined, {
                type: REQUEST_PRODUCTS,
            })
        ).toEqual({ products: [], areLoading: true });

        expect(
            Products(
                { products: products, areLoading: false },
                {
                    type: REQUEST_PRODUCTS,
                }
            )
        ).toEqual({ products: products, areLoading: true });
    });
});

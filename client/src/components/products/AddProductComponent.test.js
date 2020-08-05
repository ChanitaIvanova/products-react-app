import React from 'react';
import AddProduct from './AddProductComponent';
import { shallow } from 'enzyme';
import * as productsService from '../../services/productsService';

describe('AddProduct', () => {
    it('initializes the state correctly', () => {
        const wrapper = shallow(<AddProduct />);

        expect(wrapper.state()).toEqual({
            product: { name: '', price: 0, currency: 'USD' },
            isLoading: false,
            isAdded: undefined,
        });
    });

    describe('WHEN #addProduct is invoked', () => {
        describe('WHEN the operation is successful', () => {
            it('calls addProduct and marks the add as successful', () => {
                productsService.addProduct = jest.fn();
                productsService.addProduct.mockReturnValueOnce(
                    new Promise((resolve) => {
                        resolve(true);
                    })
                );
                const newProduct = {
                    name: 'Product',
                    price: 25,
                    currency: 'BGN',
                };
                const wrapper = shallow(<AddProduct />);
                const instance = wrapper.instance();

                instance.addProduct(newProduct);
                expect(wrapper.state().isLoading).toEqual(true);
                expect(productsService.addProduct).toHaveBeenCalledTimes(1);
                expect(productsService.addProduct).toHaveBeenCalledWith(
                    newProduct
                );

                return new Promise((resolve) => setImmediate(resolve)).then(
                    () => {
                        expect(wrapper.state().isLoading).toEqual(false);
                        expect(wrapper.state().product).toEqual({
                            name: '',
                            price: 0,
                            currency: 'USD',
                        });
                        expect(wrapper.state().isAdded).toEqual(true);
                    }
                );
            });
        });

        describe('WHEN the operation is NOT successful', () => {
            it('calls addProduct and marks the add as failed', () => {
                productsService.addProduct = jest.fn();
                productsService.addProduct.mockReturnValueOnce(
                    new Promise((resolve) => {
                        resolve(false);
                    })
                );
                const newProduct = {
                    name: 'Product',
                    price: 25,
                    currency: 'BGN',
                };
                const wrapper = shallow(<AddProduct />);
                const instance = wrapper.instance();

                instance.addProduct(newProduct);
                expect(wrapper.state().isLoading).toEqual(true);
                expect(productsService.addProduct).toHaveBeenCalledTimes(1);
                expect(productsService.addProduct).toHaveBeenCalledWith(
                    newProduct
                );

                return new Promise((resolve) => setImmediate(resolve)).then(
                    () => {
                        expect(wrapper.state().isLoading).toEqual(false);
                        expect(wrapper.state().product).toEqual({
                            name: '',
                            price: 0,
                            currency: 'USD',
                        });
                        expect(wrapper.state().isAdded).toEqual(false);
                    }
                );
            });
        });
    });
});

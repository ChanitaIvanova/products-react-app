import React from 'react';
import AddProduct from './AddProductComponent';
import { shallow } from 'enzyme';
import * as productsService from '../../services/productsService';

describe('AddProduct', () => {
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

                wrapper
                    .find('ProductFormComponent')
                    .props()
                    .handleSubmit(newProduct);
                expect(wrapper.find('LoadingBar').exists()).toEqual(true);
                expect(productsService.addProduct).toHaveBeenCalledTimes(1);
                expect(productsService.addProduct).toHaveBeenCalledWith(
                    newProduct
                );

                return new Promise((resolve) => setImmediate(resolve)).then(
                    () => {
                        expect(wrapper.find('LoadingBar').exists()).toEqual(
                            false
                        );
                        expect(
                            wrapper.find('ProductFormComponent').props().product
                        ).toEqual({
                            name: '',
                            price: 0,
                            currency: 'USD',
                        });
                        expect(wrapper.find('Message').props().level).toEqual(
                            'success'
                        );
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
                wrapper
                    .find('ProductFormComponent')
                    .props()
                    .handleSubmit(newProduct);
                expect(wrapper.find('LoadingBar').exists()).toEqual(true);
                expect(productsService.addProduct).toHaveBeenCalledTimes(1);
                expect(productsService.addProduct).toHaveBeenCalledWith(
                    newProduct
                );

                return new Promise((resolve) => setImmediate(resolve)).then(
                    () => {
                        expect(wrapper.find('LoadingBar').exists()).toEqual(
                            false
                        );
                        expect(
                            wrapper.find('ProductFormComponent').props().product
                        ).toEqual({
                            name: '',
                            price: 0,
                            currency: 'USD',
                        });
                        expect(wrapper.find('Message').props().level).toEqual(
                            'failed'
                        );
                    }
                );
            });
        });
    });
});

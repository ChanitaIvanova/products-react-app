import React from 'react';
import Home from './HomeComponent';
import { mount } from 'enzyme';
import * as productsService from '../../services/productsService';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('HomeComponent', () => {
    let products;
    beforeEach(() => {
        products = [
            {
                id: 1,
                name: 'TV',
                price: 1000,
                currency: 'USD',
            },
            {
                id: 2,
                name: 'SSD',
                price: 100,
                currency: 'USD',
            },
        ];
    });

    describe('WHEN the user does not have read permissions', () => {
        it('displays correct message', () => {
            const store = mockStore({
                permissions: { permissions: [] },
                products: { products: [], areLoading: false },
            });

            const wrapper = mount(
                <Provider store={store}>
                    <Home />
                </Provider>
            );
            expect(wrapper.find('Message').props()).toEqual({
                messageText:
                    'You do not have permissions to view the list of products!',
                level: 'failed',
            });
        });
    });

    describe('WHEN the user has read permissions', () => {
        describe('WHEN the user has only READ privileges', () => {
            it('lists the products with no actions', () => {
                const store = mockStore({
                    permissions: { permissions: ['READ'] },
                    products: { products: products, areLoading: false },
                });

                const wrapper = mount(
                    <Provider store={store}>
                        <Home />
                    </Provider>
                );

                const headerColumns = wrapper.find('table > thead > tr > th');
                expect(headerColumns.length).toEqual(3);
                expect(headerColumns.at(0).text().trim()).toEqual(
                    'Product Name'
                );
                expect(headerColumns.at(1).text().trim()).toEqual('Price');
                expect(headerColumns.at(2).text().trim()).toEqual('Currency');

                const contentRows = wrapper.find('table > tbody > tr');
                expect(contentRows.length).toEqual(2);

                const firstRowColumns = contentRows.at(0).find('td');
                expect(firstRowColumns.at(0).text().trim()).toEqual('TV');
                expect(firstRowColumns.at(1).text().trim()).toEqual('1000');
                expect(firstRowColumns.at(2).text().trim()).toEqual('USD');

                const secondRowColumns = contentRows.at(1).find('td');
                expect(secondRowColumns.at(0).text().trim()).toEqual('SSD');
                expect(secondRowColumns.at(1).text().trim()).toEqual('100');
                expect(secondRowColumns.at(2).text().trim()).toEqual('USD');
            });
        });

        describe('WHEN the user has READ and UPDATE privileges', () => {
            let wrapper;
            beforeEach(() => {
                const store = mockStore({
                    permissions: { permissions: ['READ', 'UPDATE'] },
                    products: { products: products, areLoading: false },
                });

                wrapper = mount(
                    <Provider store={store}>
                        <Home />
                    </Provider>
                );
            });
            it('lists the products with only edit action', () => {
                const headerColumns = wrapper.find('table > thead > tr > th');
                expect(headerColumns.length).toEqual(4);
                expect(headerColumns.at(0).text().trim()).toEqual(
                    'Product Name'
                );
                expect(headerColumns.at(1).text().trim()).toEqual('Price');
                expect(headerColumns.at(2).text().trim()).toEqual('Currency');
                expect(headerColumns.at(3).text().trim()).toEqual('Actions');

                const contentRows = wrapper.find('table > tbody > tr');
                expect(contentRows.length).toEqual(2);

                const firstRowColumns = contentRows.at(0).find('td');
                expect(firstRowColumns.at(0).text().trim()).toEqual('TV');
                expect(firstRowColumns.at(1).text().trim()).toEqual('1000');
                expect(firstRowColumns.at(2).text().trim()).toEqual('USD');
                let editButton = firstRowColumns.at(3).find('button');
                expect(editButton.length).toEqual(1);
                expect(editButton.text().trim()).toEqual('Edit');

                const secondRowColumns = contentRows.at(1).find('td');
                expect(secondRowColumns.at(0).text().trim()).toEqual('SSD');
                expect(secondRowColumns.at(1).text().trim()).toEqual('100');
                expect(secondRowColumns.at(2).text().trim()).toEqual('USD');

                editButton = secondRowColumns.at(3).find('button');
                expect(editButton.length).toEqual(1);
                expect(editButton.text().trim()).toEqual('Edit');
            });

            describe('WHEN edit is invoked', () => {
                it('opens the dialog and initializes selectedProduct and updatedProduct', () => {
                    const contentRows = wrapper.find('table > tbody > tr');
                    const firstRowColumns = contentRows.at(0).find('td');
                    let editButton = firstRowColumns.at(3).find('button');
                    editButton.simulate('click');
                    expect(
                        wrapper.find('ModalComponent').props().modalTitle
                    ).toEqual('Edit product');
                    expect(
                        wrapper.find('ModalComponent').props().submitBtnClass
                    ).toEqual('primary-btn');
                });

                describe('WHEN the Edit dialog is opened', () => {
                    beforeEach(() => {
                        const contentRows = wrapper.find('table > tbody > tr');
                        const firstRowColumns = contentRows.at(0).find('td');
                        let editButton = firstRowColumns.at(3).find('button');
                        editButton.simulate('click');
                    });
                    describe('WHEN closeEditModal is called', () => {
                        it('closes the modal', () => {
                            wrapper.find('ModalComponent').props().onClose();
                            wrapper.update();
                            expect(
                                wrapper.find('ModalComponent').exists()
                            ).toEqual(false);
                        });
                    });

                    describe('WHEN submitEditModal is called', () => {
                        describe('WHEN the form is valid', () => {
                            describe('WHEN the product was not updated', () => {
                                it('called editProduct but not fecthProducts', () => {
                                    productsService.editProduct = jest.fn();
                                    productsService.editProduct.mockReturnValueOnce(
                                        new Promise((resolve) => {
                                            resolve(false);
                                        })
                                    );
                                    wrapper
                                        .find('ModalComponent')
                                        .props()
                                        .onSubmit();
                                    wrapper.update();
                                    expect(
                                        wrapper.find('ModalComponent').exists()
                                    ).toEqual(false);
                                    expect(
                                        wrapper.find('LoadingBar').exists()
                                    ).toEqual(true);
                                    expect(
                                        productsService.editProduct
                                    ).toHaveBeenCalledWith(products[0]);
                                    return new Promise((resolve) =>
                                        setImmediate(resolve)
                                    ).then(() => {
                                        wrapper.update();
                                        expect(
                                            wrapper.find('LoadingBar').exists()
                                        ).toEqual(false);
                                    });
                                });
                            });

                            describe('WHEN the product was updated', () => {
                                it('called editProduct', () => {
                                    productsService.editProduct = jest.fn();
                                    productsService.editProduct.mockReturnValueOnce(
                                        new Promise((resolve) => {
                                            resolve(true);
                                        })
                                    );
                                    wrapper
                                        .find('ModalComponent')
                                        .props()
                                        .onSubmit();
                                    wrapper.update();
                                    expect(
                                        wrapper.find('ModalComponent').exists()
                                    ).toEqual(false);
                                    expect(
                                        wrapper.find('LoadingBar').exists()
                                    ).toEqual(true);
                                    expect(
                                        productsService.editProduct
                                    ).toHaveBeenCalledWith(products[0]);
                                    return new Promise((resolve) =>
                                        setImmediate(resolve)
                                    ).then(() => {
                                        wrapper.update();
                                        expect(
                                            wrapper.find('LoadingBar').exists()
                                        ).toEqual(false);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('WHEN the user has READ and DELETE privileges', () => {
            let wrapper;
            beforeEach(() => {
                const store = mockStore({
                    permissions: { permissions: ['READ', 'DELETE'] },
                    products: { products: products, areLoading: false },
                });

                wrapper = mount(
                    <Provider store={store}>
                        <Home />
                    </Provider>
                );
            });
            it('lists the products with only delete action', () => {
                const headerColumns = wrapper.find('table > thead > tr > th');
                expect(headerColumns.length).toEqual(4);
                expect(headerColumns.at(0).text().trim()).toEqual(
                    'Product Name'
                );
                expect(headerColumns.at(1).text().trim()).toEqual('Price');
                expect(headerColumns.at(2).text().trim()).toEqual('Currency');
                expect(headerColumns.at(3).text().trim()).toEqual('Actions');

                const contentRows = wrapper.find('table > tbody > tr');
                expect(contentRows.length).toEqual(2);

                const firstRowColumns = contentRows.at(0).find('td');
                expect(firstRowColumns.at(0).text().trim()).toEqual('TV');
                expect(firstRowColumns.at(1).text().trim()).toEqual('1000');
                expect(firstRowColumns.at(2).text().trim()).toEqual('USD');
                let editButton = firstRowColumns.at(3).find('button');
                expect(editButton.length).toEqual(1);
                expect(editButton.text().trim()).toEqual('Delete');

                const secondRowColumns = contentRows.at(1).find('td');
                expect(secondRowColumns.at(0).text().trim()).toEqual('SSD');
                expect(secondRowColumns.at(1).text().trim()).toEqual('100');
                expect(secondRowColumns.at(2).text().trim()).toEqual('USD');

                editButton = secondRowColumns.at(3).find('button');
                expect(editButton.length).toEqual(1);
                expect(editButton.text().trim()).toEqual('Delete');
            });

            describe('WHEN delete is invoked', () => {
                it('opens the dialog and initializes selectedProduct', () => {
                    const contentRows = wrapper.find('table > tbody > tr');
                    const firstRowColumns = contentRows.at(0).find('td');
                    let editButton = firstRowColumns.at(3).find('button');
                    editButton.simulate('click');
                    expect(
                        wrapper.find('ModalComponent').props().modalTitle
                    ).toEqual('Delete product');
                    expect(
                        wrapper.find('ModalComponent').props().submitButton
                    ).toEqual('Delete');
                    expect(
                        wrapper.find('ModalComponent').props().submitBtnClass
                    ).toEqual('danger-btn');
                });

                describe('WHEN the Delete dialog is opened', () => {
                    beforeEach(() => {
                        const contentRows = wrapper.find('table > tbody > tr');
                        const firstRowColumns = contentRows.at(0).find('td');
                        let editButton = firstRowColumns.at(3).find('button');
                        editButton.simulate('click');
                    });
                    describe('WHEN closeDeleteModal is called', () => {
                        it('closes the modal', () => {
                            wrapper.find('ModalComponent').props().onClose();
                            wrapper.update();
                            expect(
                                wrapper.find('ModalComponent').exists()
                            ).toEqual(false);
                        });
                    });

                    describe('WHEN submitDeleteModal is called', () => {
                        beforeEach(() => {
                            productsService.deleteProduct = jest.fn();
                        });

                        describe('WHEN the product was not deleted', () => {
                            it('called deleteProduct', () => {
                                productsService.deleteProduct.mockReturnValueOnce(
                                    new Promise((resolve) => {
                                        resolve(false);
                                    })
                                );
                                wrapper
                                    .find('ModalComponent')
                                    .props()
                                    .onSubmit();
                                wrapper.update();
                                expect(
                                    wrapper.find('ModalComponent').exists()
                                ).toEqual(false);
                                expect(
                                    wrapper.find('LoadingBar').exists()
                                ).toEqual(true);
                                expect(
                                    productsService.deleteProduct
                                ).toHaveBeenCalledWith(products[0]);
                                return new Promise((resolve) =>
                                    setImmediate(resolve)
                                ).then(() => {
                                    wrapper.update();
                                    expect(
                                        wrapper.find('LoadingBar').exists()
                                    ).toEqual(false);
                                });
                            });
                        });

                        describe('WHEN the product was deleted', () => {
                            it('called deleteProduct', () => {
                                productsService.deleteProduct.mockReturnValueOnce(
                                    new Promise((resolve) => {
                                        resolve(true);
                                    })
                                );
                                wrapper
                                    .find('ModalComponent')
                                    .props()
                                    .onSubmit();
                                wrapper.update();
                                expect(
                                    wrapper.find('ModalComponent').exists()
                                ).toEqual(false);
                                expect(
                                    wrapper.find('LoadingBar').exists()
                                ).toEqual(true);
                                expect(
                                    productsService.deleteProduct
                                ).toHaveBeenCalledWith(products[0]);
                                return new Promise((resolve) =>
                                    setImmediate(resolve)
                                ).then(() => {
                                    wrapper.update();
                                    expect(
                                        wrapper.find('LoadingBar').exists()
                                    ).toEqual(false);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

import React from 'react';
import { HomeComponent } from './HomeComponent';
import { shallow } from 'enzyme';
import * as productsService from '../../services/productsService';
import * as permissionsService from '../../services/permissionsService';

describe('HomeComponent', () => {
    let products;
    beforeEach(() => {
        products = [{
            "id": 1,
            "name": "TV",
            "price": 1000,
            "currency": "USD"
          },
          {
            "id": 2,
            "name": "SSD",
            "price": 100,
            "currency": "USD"
          }];
    });

    it('initializes the state correctly', () => {
        const mockProps = {
            fetchProducts: jest.fn(),
            products: {areLoading: true}
        };
        const wrapper = shallow(
            <HomeComponent {...mockProps}/>
        );

        expect(wrapper.state()).toEqual({
            isLoading: true,
            hasReadPermissions: false,
            hasEditPermissions: false,
            hasDeletePermissions: false,
            openEdit: false,
            openDelete: false,
            selectedProduct: undefined,
            updatedProduct: undefined,
            isUpdateFormValid: true
        });
    });

    describe("WHEN the user does not have read permissions", () => {
        it('does not request the products', () => {
            permissionsService.fetchPermissions = jest.fn();
            permissionsService.fetchPermissions.mockReturnValueOnce(new Promise((resolve) => {
                resolve([]);
            }));
            const mockProps = {
                fetchProducts: jest.fn(),
                products: {areLoading: true}
            };
            const wrapper = shallow(
                <HomeComponent {...mockProps}/>
            );
            expect(wrapper.state().isLoading).toEqual(true);
            return new Promise(resolve => setImmediate(resolve)).then(() => {
                expect(wrapper.state().isLoading).toEqual(false);
                expect(mockProps.fetchProducts).not.toHaveBeenCalled();
            });
        });

        it ('sets hasReadPermissions to false', () => {
            permissionsService.fetchPermissions = jest.fn();
            permissionsService.fetchPermissions.mockReturnValueOnce(new Promise((resolve) => {
                resolve([]);
            }));
            const mockProps = {
                fetchProducts: jest.fn(),
                products: {areLoading: true}
            };
            const wrapper = shallow(
                <HomeComponent {...mockProps}/>
            );

            return new Promise(resolve => setImmediate(resolve)).then(() => {
                expect(wrapper.state().isLoading).toEqual(false);
                expect(wrapper.state().hasReadPermissions).toEqual(false);
            });
        });
    });

    describe("WHEN the user has read permissions", () => {
        describe('WHEN the user has only READ privileges', () => {
            beforeEach(() => {
                permissionsService.fetchPermissions = jest.fn();
                permissionsService.fetchPermissions.mockReturnValueOnce(new Promise((resolve) => {
                    resolve(['READ']);
                }));
            });
            it('requests the products and sets hasReadPermissions to true', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: true
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
                expect(wrapper.state().isLoading).toEqual(true);
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    expect(mockProps.fetchProducts).toHaveBeenCalled();
                });
            });
    
            it ('lists the products with no actions', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: false, 
                    products: products
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
    
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    const headerColumns = wrapper.find('table > thead > tr > th');
                    expect(headerColumns.length).toEqual(3);
                    expect(headerColumns.at(0).text().trim()).toEqual('Product Name');
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
        });

        describe('WHEN the user has READ and UPDATE privileges', () => {
            beforeEach(() => {
                permissionsService.fetchPermissions = jest.fn();
                permissionsService.fetchPermissions.mockReturnValueOnce(new Promise((resolve) => {
                    resolve(['READ', 'UPDATE']);
                }));
            });
            it('requests the products and sets hasReadPermissions and hasEditPermissions to true', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: true
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
                expect(wrapper.state().isLoading).toEqual(true);
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    expect(wrapper.state().hasEditPermissions).toEqual(true);
                    expect(mockProps.fetchProducts).toHaveBeenCalled();
                });
            });
    
            it ('lists the products with only edit action', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: false, 
                    products: products
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
    
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    expect(wrapper.state().hasEditPermissions).toEqual(true);
                    const headerColumns = wrapper.find('table > thead > tr > th');
                    expect(headerColumns.length).toEqual(4);
                    expect(headerColumns.at(0).text().trim()).toEqual('Product Name');
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
            });

            describe('WHEN edit is invoked', () => {
                it ('opens the dialog and initializes selectedProduct and updatedProduct', () => {
                    const mockProps = {
                        fetchProducts: jest.fn(),
                        areLoading: false, 
                        products: products
                    };
                    const wrapper = shallow(
                        <HomeComponent {...mockProps}/>
                    );
        
                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                        expect(wrapper.state().isLoading).toEqual(false);
                        expect(wrapper.state().hasReadPermissions).toEqual(true);
                        const contentRows = wrapper.find('table > tbody > tr');
                        const firstRowColumns = contentRows.at(0).find('td');
                        let editButton = firstRowColumns.at(3).find('button');
                        editButton.simulate('click');
                        expect(wrapper.state().openEdit).toEqual(true);
                        expect(wrapper.state().selectedProduct).toEqual(products[0]);
                        expect(wrapper.state().updatedProduct).toEqual(products[0]);
                    });
                });

                describe('WHEN the Edit dialog is opened', () => {
                    let wrapper;
                    let mockProps
                    beforeEach(() => {
                        mockProps = {
                            fetchProducts: jest.fn(),
                            areLoading: false, 
                            products: products
                        };
                        wrapper = shallow(
                            <HomeComponent {...mockProps}/>
                        );

                        wrapper.setState({openEdit: true});
            
                    });
                    describe('WHEN closeEditModal is called', () => {
                        it ('closes the modal', () => {
                            const instance = wrapper.instance();
                            instance.closeEditModal();
                            expect(wrapper.state().openEdit).toEqual(false);
                        });
                    });

                    describe('WHEN submitEditModal is called', () => {
                        describe('WHEN the form is not valid', () => {
                            it('does not call the editProduct', () => {
                                productsService.editProduct = jest.fn();
                                wrapper.setState({isUpdateFormValid: false});
                                const instance = wrapper.instance();
                                instance.submitEditModal();
                                expect(productsService.editProduct).not.toHaveBeenCalled();
                            });
                        });

                        describe('WHEN the form is valid', () => {
                            let updatedProduct;
                            beforeEach(() => {
                                updatedProduct = [
                                    {
                                        "id": 1,
                                        "name": "TV TV",
                                        "price": 1050,
                                        "currency": "USD"
                                    }
                                ];
                                productsService.editProduct = jest.fn();
                            });

                            describe('WHEN the product was not updated', () => {
                                it('called editProduct but not fecthProducts', () => {
                                    productsService.editProduct.mockReturnValueOnce(new Promise((resolve) => {
                                        resolve(false);
                                    }));
                                    wrapper.setState({isUpdateFormValid: true});
                                    wrapper.setState({updatedProduct: updatedProduct});
                                    const instance = wrapper.instance();
                                    mockProps.fetchProducts.mockClear();
                                    instance.submitEditModal();
                                    expect(wrapper.state().openEdit).toEqual(false);
                                    expect(wrapper.state().isLoading).toEqual(true);
                                    expect(productsService.editProduct).toHaveBeenCalledWith(updatedProduct);
                                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                                        expect(wrapper.state().isLoading).toEqual(false);
                                        expect(mockProps.fetchProducts).not.toHaveBeenCalled();
                                    });
                                });
                            });

                            describe('WHEN the product was updated', () => {
                                it('called editProduct and fecthProducts', () => {
                                    productsService.editProduct.mockReturnValueOnce(new Promise((resolve) => {
                                        resolve(true);
                                    }));
                                    wrapper.setState({isUpdateFormValid: true});
                                    wrapper.setState({updatedProduct: updatedProduct});
                                    const instance = wrapper.instance();
                                    mockProps.fetchProducts.mockClear();
                                    instance.submitEditModal();
                                    expect(wrapper.state().openEdit).toEqual(false);
                                    expect(wrapper.state().isLoading).toEqual(true);
                                    expect(productsService.editProduct).toHaveBeenCalledWith(updatedProduct);
                                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                                        expect(wrapper.state().isLoading).toEqual(false);
                                        expect(mockProps.fetchProducts).toHaveBeenCalled();
                                    });
                                });
                            });
                            
                        });
                    });
                });
            });
        });

        describe('WHEN the user has READ and DELETE privileges', () => {
            beforeEach(() => {
                permissionsService.fetchPermissions = jest.fn();
                permissionsService.fetchPermissions.mockReturnValueOnce(new Promise((resolve) => {
                    resolve(['READ', 'DELETE']);
                }));
            });
            it('requests the products and sets hasReadPermissions and hasDeletePermissions to true', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: true
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
                expect(wrapper.state().isLoading).toEqual(true);
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    expect(wrapper.state().hasDeletePermissions).toEqual(true);
                    expect(mockProps.fetchProducts).toHaveBeenCalled();
                });
            });
    
            it ('lists the products with only delete action', () => {
                const mockProps = {
                    fetchProducts: jest.fn(),
                    areLoading: false, 
                    products: products
                };
                const wrapper = shallow(
                    <HomeComponent {...mockProps}/>
                );
    
                return new Promise(resolve => setImmediate(resolve)).then(() => {
                    expect(wrapper.state().isLoading).toEqual(false);
                    expect(wrapper.state().hasReadPermissions).toEqual(true);
                    expect(wrapper.state().hasDeletePermissions).toEqual(true);
                    const headerColumns = wrapper.find('table > thead > tr > th');
                    expect(headerColumns.length).toEqual(4);
                    expect(headerColumns.at(0).text().trim()).toEqual('Product Name');
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
            });

            describe('WHEN delete is invoked', () => {
                it ('opens the dialog and initializes selectedProduct', () => {
                    const mockProps = {
                        fetchProducts: jest.fn(),
                        areLoading: false, 
                        products: products
                    };
                    const wrapper = shallow(
                        <HomeComponent {...mockProps}/>
                    );
        
                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                        expect(wrapper.state().isLoading).toEqual(false);
                        expect(wrapper.state().hasReadPermissions).toEqual(true);
                        const contentRows = wrapper.find('table > tbody > tr');
                        const firstRowColumns = contentRows.at(0).find('td');
                        let editButton = firstRowColumns.at(3).find('button');
                        editButton.simulate('click');
                        expect(wrapper.state().openDelete).toEqual(true);
                        expect(wrapper.state().selectedProduct).toEqual(products[0]);
                    });
                });

                describe('WHEN the Delete dialog is opened', () => {
                    let wrapper;
                    let mockProps
                    beforeEach(() => {
                        mockProps = {
                            fetchProducts: jest.fn(),
                            areLoading: false, 
                            products: products
                        };
                        wrapper = shallow(
                            <HomeComponent {...mockProps}/>
                        );

                        wrapper.setState({openDelete: true});
            
                    });
                    describe('WHEN closeDeleteModal is called', () => {
                        it ('closes the modal', () => {
                            const instance = wrapper.instance();
                            instance.closeDeleteModal();
                            expect(wrapper.state().openDelete).toEqual(false);
                        });
                    });

                    describe('WHEN submitDeleteModal is called', () => {
                            beforeEach(() => {
                                productsService.deleteProduct = jest.fn();
                            });

                            describe('WHEN the product was not deleted', () => {
                                it('called deleteProduct but not fecthProducts', () => {
                                    productsService.deleteProduct.mockReturnValueOnce(new Promise((resolve) => {
                                        resolve(false);
                                    }));
                                    wrapper.setState({selectedProduct: products[0]});
                                    const instance = wrapper.instance();
                                    mockProps.fetchProducts.mockClear();
                                    instance.submitDeleteModal();
                                    expect(wrapper.state().openDelete).toEqual(false);
                                    expect(wrapper.state().isLoading).toEqual(true);
                                    expect(productsService.deleteProduct).toHaveBeenCalledWith( products[0]);
                                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                                        expect(wrapper.state().isLoading).toEqual(false);
                                        expect(mockProps.fetchProducts).not.toHaveBeenCalled();
                                    });
                                });
                            });

                            describe('WHEN the product was deleted', () => {
                                it('called deleteProduct and fecthProducts', () => {
                                    productsService.deleteProduct.mockReturnValueOnce(new Promise((resolve) => {
                                        resolve(true);
                                    }));
                                    wrapper.setState({selectedProduct: products[0]});
                                    const instance = wrapper.instance();
                                    mockProps.fetchProducts.mockClear();
                                    instance.submitDeleteModal();
                                    expect(wrapper.state().openDelete).toEqual(false);
                                    expect(wrapper.state().isLoading).toEqual(true);
                                    expect(productsService.deleteProduct).toHaveBeenCalledWith( products[0]);
                                    return new Promise(resolve => setImmediate(resolve)).then(() => {
                                        expect(wrapper.state().isLoading).toEqual(false);
                                        expect(mockProps.fetchProducts).toHaveBeenCalled();
                                    });
                                });
                            });
                    });
                });
            });
        });
    });
});
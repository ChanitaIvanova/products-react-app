import { baseUrl } from '../config';
import { fetchProducts, addProduct, editProduct, deleteProduct } from './productsService';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS } from '../state/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('productsService', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('#fetchProducts', () => {
        describe('WHEN the promise is resolve successfully', () => {
            it("returns the products and calls the expected actions", () => {
                const products = [
                    {
                        id: 1,
                        name: "Iron",
                        price: 20,
                        currency: "USD"
                    },
                    {
                        id: 2,
                        name: "TV",
                        price: 500,
                        currency: "USD"
                    }
                ];
                fetch.mockResponseOnce(JSON.stringify(products));
                const expectedActions = [
                    { type: REQUEST_PRODUCTS },
                    { type: RECEIVE_PRODUCTS, payload: products }
                  ]
                  const store = mockStore({ products: [] })
                  return store.dispatch(fetchProducts()).then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                  });
            });
        });

        describe('WHEN the promise is rejected', () => {
            it("returns empty products list and calls the expected actions", () => {
                fetch.mockReject(() => Promise.reject("Failed to get data"));
                const expectedActions = [
                    { type: REQUEST_PRODUCTS },
                    { type: RECEIVE_PRODUCTS, payload: [] }
                  ]
                  const store = mockStore({ products: [] })
                  return store.dispatch(fetchProducts()).then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                  });
            });
        })
    });

    describe('#addProduct', () => {
        describe('WHEN the promise is resolve successfully', () => {
            it("returns true", () => {
                fetch.mockResponseOnce({});
                const product = {
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return addProduct(product).then(isAdded => {
                    expect(isAdded).toEqual(true);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products', {
                        method: "POST",
                        body: JSON.stringify(product),
                        headers: {
                          "Content-Type": "application/json"
                        }
                    });
                });
                
            });
        });

        describe('WHEN the promise is rejected', () => {
            it("returns false", () => {
                fetch.mockReject(() => Promise.reject("Failed to get data"));
                const product = {
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return addProduct(product).then(isAdded => {
                    expect(isAdded).toEqual(false);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products', {
                        method: "POST",
                        body: JSON.stringify(product),
                        headers: {
                          "Content-Type": "application/json"
                        }
                    });
                });
            });
        })
    });

    describe('#editProduct', () => {
        describe('WHEN the promise is resolve successfully', () => {
            it("returns true", () => {
                fetch.mockResponseOnce({});
                const product = {
                    id: 1,
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return editProduct(product).then(isUpdated => {
                    expect(isUpdated).toEqual(true);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products/1', {
                        method: "PUT",
                        body: JSON.stringify(product),
                        headers: {
                          "Content-Type": "application/json"
                        }
                    });
                });
                
            });
        });

        describe('WHEN the promise is rejected', () => {
            it("returns false", () => {
                fetch.mockReject(() => Promise.reject("Failed to get data"));
                const product = {
                    id: 1,
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return editProduct(product).then(isUpdated => {
                    expect(isUpdated).toEqual(false);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products/1', {
                        method: "PUT",
                        body: JSON.stringify(product),
                        headers: {
                          "Content-Type": "application/json"
                        }
                    });
                });
            });
        })
    });

    describe('#deleteProduct', () => {
        describe('WHEN the promise is resolved successfully', () => {
            it("returns true", () => {
                fetch.mockResponseOnce({});
                const product = {
                    id: 1,
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return deleteProduct(product).then(isDeleted => {
                    expect(isDeleted).toEqual(true);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products/1', {
                        method: "DELETE"
                    });
                });
                
            });
        });

        describe('WHEN the promise is rejected', () => {
            it("returns false", () => {
                fetch.mockReject(() => Promise.reject("Failed to get data"));
                const product = {
                    id: 1,
                    name: "Iron",
                    price: 20,
                    currency: "USD"
                }

                return deleteProduct(product).then(isDeleted => {
                    expect(isDeleted).toEqual(false);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'products/1', {
                        method: "DELETE"
                    });
                });
            });
        })
    });
})

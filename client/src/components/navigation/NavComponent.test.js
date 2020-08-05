import React from 'react';
import NavComponent from './NavComponent';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('NavComponent', () => {
    describe('WHEN the user does not have create privilege', () => {
        it('does not display the Add Product link', () => {
            const store = mockStore({
                permissions: { permissions: [] },
                products: {},
            });

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <NavComponent />
                    </BrowserRouter>
                </Provider>
            );

            return new Promise((resolve) => setImmediate(resolve)).then(() => {
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(1);
                expect(listItems.text().trim()).toEqual('Home');
            });
        });
    });

    describe('WHEN the user has create privilege', () => {
        it('displays Home and Add Product links', () => {
            const store = mockStore({
                permissions: { permissions: ['CREATE'] },
                products: {},
            });

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <NavComponent />
                    </BrowserRouter>
                </Provider>
            );
            return new Promise((resolve) => setImmediate(resolve)).then(() => {
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(2);
                expect(listItems.at(0).text().trim()).toEqual('Home');
                expect(listItems.at(1).text().trim()).toEqual('Add Product');
            });
        });
    });
});

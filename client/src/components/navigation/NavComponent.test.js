import React from 'react';
import NavComponent from './NavComponent';
import { shallow, mount } from 'enzyme';
import * as permissionsService from '../../services/permissionsService';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('NavComponent', () => {
    describe('WHEN the user does not have create privilege', () => {
        it('does not display the Add Product link', () => {
            permissionsService.fetchPermissions = jest.fn();
            permissionsService.fetchPermissions.mockReturnValueOnce(
                new Promise((resolve) => {
                    resolve([]);
                })
            );
            const wrapper = shallow(<NavComponent />);

            return new Promise((resolve) => setImmediate(resolve)).then(() => {
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(1);
                expect(listItems.text().trim()).toEqual('Home');
            });
        });
    });

    describe('WHEN the user has create privilege', () => {
        xit('displays Home and Add Product links', () => {
            permissionsService.fetchPermissions = jest.fn();
            permissionsService.fetchPermissions.mockReturnValueOnce(
                new Promise((resolve) => {
                    resolve(['CREATE']);
                })
            );
            let wrapper;
            act(() => {
                wrapper = mount(<NavComponent />);
            });

            return new Promise((resolve) => setImmediate(resolve)).then(() => {
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(2);
                expect(listItems.at(0).text().trim()).toEqual('Home');
                expect(listItems.at(1).text().trim()).toEqual('Add Product');
            });
        });
    });
});

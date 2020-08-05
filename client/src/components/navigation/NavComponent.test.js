import React from 'react';
import NavComponent from './NavComponent';
import { shallow } from 'enzyme';
import * as permissionsService from '../../services/permissionsService';

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
                expect(wrapper.state().canAddProduct).toEqual(false);
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(1);
                expect(listItems.text().trim()).toEqual('Home');
            });
        });
    });

    describe('WHEN the user has create privilege', () => {
        it('displays Home and Add Product links', () => {
            permissionsService.fetchPermissions = jest.fn();
            permissionsService.fetchPermissions.mockReturnValueOnce(
                new Promise((resolve) => {
                    resolve(['CREATE']);
                })
            );
            const wrapper = shallow(<NavComponent />);

            return new Promise((resolve) => setImmediate(resolve)).then(() => {
                expect(wrapper.state().canAddProduct).toEqual(true);
                const listItems = wrapper.find('ul li');
                expect(listItems.length).toEqual(2);
                expect(listItems.at(0).text().trim()).toEqual('Home');
                expect(listItems.at(1).text().trim()).toEqual('Add Product');
            });
        });
    });
});

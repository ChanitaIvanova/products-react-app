import React from 'react';
import { render } from '@testing-library/react';
import LoadingBar from './LoadingBarComponent';

describe('LoadingBarComponent', () => {
    describe('WHEN the loading bar size is large', () => {
        it('renders div with correct size', () => {
            const result = render(<LoadingBar size='large' />);
            const loaderContainer = result.baseElement.querySelector(
                '.loader-container'
            );
            const loadingElement = loaderContainer.querySelector('.loader');
            expect(loadingElement.className).toEqual('loader large');
        });
    });

    describe('WHEN the loading bar size is medium', () => {
        it('renders div with correct size', () => {
            const result = render(<LoadingBar size='medium' />);
            const loaderContainer = result.baseElement.querySelector(
                '.loader-container'
            );
            const loadingElement = loaderContainer.querySelector('.loader');
            expect(loadingElement.className).toEqual('loader medium');
        });
    });

    describe('WHEN the loading bar size is small', () => {
        it('renders div with correct size', () => {
            const result = render(<LoadingBar size='small' />);
            const loaderContainer = result.baseElement.querySelector(
                '.loader-container'
            );
            const loadingElement = loaderContainer.querySelector('.loader');
            expect(loadingElement.className).toEqual('loader small');
        });
    });
});

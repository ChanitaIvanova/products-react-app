import React from 'react';
import { render } from '@testing-library/react';
import ValidationBanner from './ValidationBannerComponent';

describe('ValidationBanner', () => {
    describe('WHEN display property is false', () => {
        it('renders error with class hidden', () => {
            const result = render(
                <ValidationBanner display={false} errorMessage="Error message"/>,
            );
            const messageElement = result.baseElement.querySelector(".error-message");
            expect(messageElement.className.trim()).toEqual("error-message hidden");
            expect(messageElement.textContent.trim()).toEqual("Error message");
        })
    });
    
    describe('WHEN display property is true', () => {
        it('renders error without class hidden', () => {
            const result = render(
                <ValidationBanner display={true} errorMessage="Error message"/>,
            );
            const messageElement = result.baseElement.querySelector(".error-message");
            expect(messageElement.className.trim()).toEqual("error-message");
            expect(messageElement.textContent.trim()).toEqual("Error message");
        })
    });
});

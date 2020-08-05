import React from 'react';
import ModalComponent from './ModalComponent';
import { render, fireEvent } from '@testing-library/react';

describe('ModalComponent', () => {
    it('initializes the view with the default values', () => {
        const result = render(<ModalComponent />);
        const loaderContainer = result.baseElement.querySelector('h5');
        expect(loaderContainer.textContent.trim()).toEqual('');
        const modalButtons = result.baseElement.querySelectorAll('button');
        expect(modalButtons[1].textContent.trim()).toEqual('Cancel');
        expect(modalButtons[2].textContent.trim()).toEqual('Submit');
        expect(modalButtons[2].className.trim()).toEqual('default-btn');
    });

    describe('WHEN alternate values are provided', () => {
        it('uses those values', () => {
            const result = render(
                <ModalComponent
                    submitButton='Save'
                    cancelButton='Close'
                    modalTitle='Title'
                    submitBtnClass='primary-btn'
                />
            );
            const loaderContainer = result.baseElement.querySelector('h5');
            expect(loaderContainer.textContent.trim()).toEqual('Title');
            const modalButtons = result.baseElement.querySelectorAll('button');
            expect(modalButtons[1].textContent.trim()).toEqual('Close');
            expect(modalButtons[2].textContent.trim()).toEqual('Save');
            expect(modalButtons[2].className.trim()).toEqual('primary-btn');
        });
    });

    describe('WHEN some content is provided provided', () => {
        it('uses those values', () => {
            const result = render(
                <ModalComponent>
                    <div data-test-id='test-div'>I'm here</div>
                </ModalComponent>
            );
            const customContent = result.baseElement.querySelector(
                "div[data-test-id='test-div']"
            );
            expect(customContent.textContent.trim()).toEqual("I'm here");
        });
    });

    describe('WHEN handleClose is called', () => {
        it('calls the provided handler', () => {
            let isClosed = false;
            const onClose = () => {
                isClosed = true;
            };

            const result = render(<ModalComponent onClose={onClose} />);
            const modalButtons = result.baseElement.querySelectorAll('button');
            fireEvent.click(modalButtons[1]);
            expect(isClosed).toEqual(true);
        });
    });

    describe('WHEN handleSubmit is called', () => {
        it('calls the provided handler', () => {
            let isSubmitted = false;
            const onSubmit = () => {
                isSubmitted = true;
            };

            const result = render(<ModalComponent onSubmit={onSubmit} />);
            const modalButtons = result.baseElement.querySelectorAll('button');
            fireEvent.click(modalButtons[2]);
            expect(isSubmitted).toEqual(true);
        });
    });
});

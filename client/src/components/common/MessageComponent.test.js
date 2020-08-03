import React from 'react';
import {render} from '@testing-library/react';
import Message from './MessageComponent';

describe('WHEN the message has a level info', () => {
    it('renders div with correct text and class', () => {
        const result = render(
            <Message level="info" messageText="Some random text" />,
        );
        const messageContainer = result.baseElement.querySelector(".message-container");
        expect(messageContainer.className).toEqual("message-container info");
        expect(messageContainer.textContent.trim()).toEqual("Some random text");
    })
});

describe('WHEN the message has a level warning', () => {
    it('renders div with correct text and class', () => {
        const result = render(
            <Message level="warning" messageText="Some random text" />,
        );
        const messageContainer = result.baseElement.querySelector(".message-container");
        expect(messageContainer.className).toEqual("message-container warning");
        expect(messageContainer.textContent.trim()).toEqual("Some random text");
    })
});

describe('WHEN the message has a level success', () => {
    it('renders div with correct text and class', () => {
        const result = render(
            <Message level="success" messageText="Some random text" />,
        );
        const messageContainer = result.baseElement.querySelector(".message-container");
        expect(messageContainer.className).toEqual("message-container success");
        expect(messageContainer.textContent.trim()).toEqual("Some random text");
    })
});

describe('WHEN the message has a level failed', () => {
    it('renders div with correct text and class', () => {
        const result = render(
            <Message level="failed" messageText="Some random text" />,
        );
        const messageContainer = result.baseElement.querySelector(".message-container");
        expect(messageContainer.className).toEqual("message-container failed");
        expect(messageContainer.textContent.trim()).toEqual("Some random text");
    })
});
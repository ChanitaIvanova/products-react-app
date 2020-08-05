import React from 'react';
import './Message.scss';

const Message = ({ level = 'info', messageText = '' }) => {
    return (
        <div className={`message-container ${level}`}>
            <span>{messageText}</span>
        </div>
    );
};

export default Message;

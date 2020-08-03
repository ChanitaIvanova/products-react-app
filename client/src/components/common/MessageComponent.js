import React, { Component } from 'react';
import './Message.scss';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: this.props.level || 'info',
            messageText: this.props.messageText || ''
        }
    }
    render() {
        return(
            <div className={`message-container ${this.state.level}`}>
                <span>{this.state.messageText}</span>
            </div>
        )
    }
}
  
export default Message;
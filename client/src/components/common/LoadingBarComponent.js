import React, { Component } from 'react';
import './LoadingBar.scss';

class LoadingBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size || 'large',
        };
    }
    render() {
        return (
            <div className='loader-container'>
                <div
                    className={`loader ${this.state.size}`}
                    title='Loading'
                ></div>
            </div>
        );
    }
}

export default LoadingBar;

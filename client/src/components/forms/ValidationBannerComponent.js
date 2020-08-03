import React, { Component } from 'react';
import './ValidationBanner.scss';

class ValidationBanner extends Component {
    render() {
        if (!this.props.display) {
            return null;
        }

        return(
            <span className="error-message">{this.props.errorMessage}</span>
        )
    }
}
  
export default ValidationBanner;
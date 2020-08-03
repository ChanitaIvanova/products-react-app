import React, { Component } from 'react';
import './ValidationBanner.scss';

class ValidationBanner extends Component {
    render() {
        return(
            <span className={"error-message " + (this.props.display ? "" : "hidden")}>{this.props.errorMessage}</span>
        )
    }
}
  
export default ValidationBanner;
import React from 'react';
import './ValidationBanner.scss';

const ValidationBanner = ({ display = false, errorMessage = '' }) => {
    return (
        <span className={'error-message ' + (display ? '' : 'hidden')}>
            {errorMessage}
        </span>
    );
};

export default ValidationBanner;

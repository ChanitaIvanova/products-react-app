import React from 'react';
import './LoadingBar.scss';

const LoadingBar = ({ size = 'large' }) => {
    return (
        <div className='loader-container'>
            <div className={`loader ${size}`} title='Loading'></div>
        </div>
    );
};

export default LoadingBar;

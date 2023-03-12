import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './ProgressBar.css';

const CustomProgressBar = ({ chargePercentage }) => {
    return <ProgressBar
        className='progressBar'
        variant="info"
        now={chargePercentage}
        label={`${chargePercentage}%`} />;
}

export default CustomProgressBar


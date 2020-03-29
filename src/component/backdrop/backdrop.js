import React from 'react';
import './backdrop.styles.css';

const backdrop = (props) => {
    return (
        props.show ? <div className='backdrop' /> : null
    );
}
export default backdrop;
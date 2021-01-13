import React from 'react';
import './Select.style.css';

const Select = ({children, className, ...props}) => {
    return (
        <select {...props} className={`Select ${className && className}`}>
            {children}
        </select>
    )
}

export default Select;

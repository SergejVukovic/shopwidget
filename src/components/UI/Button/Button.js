import React from 'react';

import './Button.style.css';

const Button = (props) => {
    const className = props.className || ''
    return <button {...props} className={`Button ${className}`}>
        {props.children}
    </button>
}

export default Button;

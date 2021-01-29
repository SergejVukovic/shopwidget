import React from 'react';

import './Button.style.css';

const Button = (props) => {
    const className = props.className || ''
    return (
        <div className={`Button ${className}`}>
            <button  {...props}>
                {props.children}
            </button>
        </div>
        )
}

export default Button;

import React from 'react';
import Button from "../Button";

import './QuantityControl.style.css';

const QuantityControl = ({quantity, onChange, min = 1, showLabel = true}) => {

    const handleAdd = () => {
        onChange(quantity + 1);
    };
    const handleDecrease = () => {
        onChange(quantity === min ? min : quantity - 1);
    }

    return (
        <div className={'QuantityControl'}>
            {showLabel &&  <h4>Količina:</h4>}
            <Button onClick={handleDecrease}>
                {
                    quantity === 1 ? 'x' : '-'
                }
            </Button>
            <div className={'QuantityControlAmount'}>
                {
                   quantity
                }
            </div>
            <Button onClick={handleAdd}> + </Button>
        </div>
    )
}

export default QuantityControl;

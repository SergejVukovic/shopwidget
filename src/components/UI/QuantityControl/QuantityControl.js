import React, {useEffect, useState} from 'react';
import Button from "../Button";

import './QuantityControl.style.css';

const QuantityControl = ({passedQuantity, onChange, min = 1, localState = true, showLabel = true}) => {

    const [quantity, setQuantity] = useState(passedQuantity || min);

    useEffect(() => {
        if(localState) {
            onChange(quantity)
        }
    }, [quantity, onChange, localState])

    const handleAdd = () => localState ? setQuantity(quantity + 1) : onChange(passedQuantity + 1);
    const handleDecrease = () =>
        localState ?
            setQuantity(() => quantity === min ? min : quantity - 1)
            :
            onChange(passedQuantity === min ? min : passedQuantity - 1);

    return (
        <div className={'QuantityControl'}>
            {showLabel &&  <h4>Qty:</h4>}
            <Button onClick={handleDecrease}>
                {
                    localState ?
                        quantity === 0 ? 'x' : '-'
                        :
                        passedQuantity === 0 ? 'x' : '-'
                }
            </Button>
            <div className={'QuantityControlAmount'}>
                {
                    localState ?
                        quantity
                        :
                        passedQuantity
                }
            </div>
            <Button onClick={handleAdd}> + </Button>
        </div>
    )
}

export default QuantityControl;

import React from "react";
import {useContext} from "react";
import {CartContext} from "../../contexts/Cart/CartContext";

import './ShoppingCartProductList.style.css';
import QuantityControl from "../UI/QuantityControl";
import Select from "../UI/Select/Select";

const ShoppingCartProductList = () => {

    const {cartItems,removeProduct, updateProduct} = useContext(CartContext);

    const handleQuantityChange = (product, quantity) => {
        if(quantity === 0) return removeProduct(product);
        updateProduct({
            ...product,
            quantity
        });
    }

    const handleMeasurementChange = (event, product) => {
        updateProduct({
            ...product,
            selectedMeasurement: product.measurements.filter(measurement => measurement.id === Number(event.target.value))[0]
        })
    }

    return (
        <div className={"ShoppingCartProductList"}>
            {
                cartItems.map(product => {
                    return (
                        <div key={product.id} className={`ShoppingCartProductListItem`}>
                            <div className={'ShoppingCartProductListItemMainPart'}>
                                <div className={'ShoppingCartProductListProductName'}>
                                    {product.name}
                                </div>
                                <div className={"ShoppingCartProductListButtons"}>
                                    <QuantityControl
                                        quantity={product.quantity}
                                        onChange={(quantity) => handleQuantityChange(product, quantity)}
                                        min={0}
                                        showLabel={false}
                                    />
                                </div>
                            </div>
                            {
                                product?.measurements?.length > 0 &&
                                <Select value={product?.selectedMeasurement?.id} onChange={(event) => handleMeasurementChange(event, product)}>
                                    {product.measurements.map(measurement => <option value={measurement.id} key={measurement.id}>{measurement.unit}</option>)}
                                </Select>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShoppingCartProductList;

import React from "react";

import './ShoppingCartProductList.style.css';
import QuantityControl from "../UI/QuantityControl";
import Select from "../UI/Select/Select";
import {useDispatch} from "react-redux";
import {removeProduct, updateProduct} from "../../store/actions/cart.action";

const ShoppingCartProductList = ({cartItems = [], currency}) => {

    const dispatch = useDispatch();

    const handleQuantityChange = (product, quantity) => {
        if(quantity === 0) return dispatch(removeProduct(product));
        dispatch(
            updateProduct({
                ...product,
                quantity
            })
        );
    }

    const handleMeasurementChange = (event, product) => {
        dispatch(
            updateProduct({
                ...product,
                selectedMeasurement: product.measurements.filter(measurement => measurement.id === Number(event.target.value))[0]
            })
        );
    }

    return (
        <div className={'ShoppingCartProductList'}>
            {
                cartItems.map(product => {
                    return (
                        <div key={product.id} className={'ShoppingCartProductListItem'}>
                            <div className={'ShoppingCartProductListItemMainPart'}>
                                <div className={'ShoppingCartProductListProductName'}>
                                    <img alt={product.name} src={product?.images.filter(image => image.is_main)[0].image_url} width={100} height={100} />
                                    <div>
                                        <p>{product.name}</p>
                                        <p>{product.is_sale ? product.sale_price : product.price} {currency}</p>
                                    </div>
                                </div>
                                <div className={'ShoppingCartProductListButtons'}>
                                    <QuantityControl
                                        quantity={product.quantity}
                                        onChange={(quantity) => handleQuantityChange(product, quantity)}
                                        showLabel={false}
                                        min={0}
                                    />
                                    {
                                        product?.measurements?.length > 0 &&
                                        <Select value={product?.selectedMeasurement?.id} onChange={(event) => handleMeasurementChange(event, product)}>
                                            {product.measurements.map(measurement => <option value={measurement.id} key={measurement.id}>{measurement.unit}</option>)}
                                        </Select>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShoppingCartProductList;

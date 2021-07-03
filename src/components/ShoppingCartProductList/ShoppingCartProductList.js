import React from "react";
import styled from "styled-components";

import QuantityControl from "../UI/QuantityControl";
import Select from "../UI/Select/Select";
import {useDispatch} from "react-redux";
import {removeProduct, updateProduct} from "../../store/actions/cart.action";

const ShoppingCartProductListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 16px;
    height: calc(100vh - 170px);
`;

const ShoppingCartProductListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 16px;
    border-bottom: 1px solid #ebebeb;
    width: 100%;
    flex-wrap: wrap;
`

const ShoppingCartProductContainer = styled.div `
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ShoppingCartProductHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-align: left;
`

const ShoppingCartProductRemoveButton = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShoppingCartProductFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 16px;
`

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

    const handleVariationChange = (event, product) => {
        dispatch(
            updateProduct({
                ...product,
                selectedVariation: product.variations.filter(variation => variation.id === Number(event.target.value))[0]
            })
        );
    }

    const handleProductRemove = (product) => dispatch(removeProduct(product));

    return (
        <ShoppingCartProductListContainer>
            {
                cartItems.map(product => {
                    return (
                        <ShoppingCartProductListItem key={product.id}>
                            <ShoppingCartProductContainer>
                                <ShoppingCartProductHeader>
                                    <QuantityControl
                                        quantity={product.quantity}
                                        onChange={(quantity) => handleQuantityChange(product, quantity)}
                                        showLabel={false}
                                        min={1}
                                        vertical={true}
                                        secondaryBackground={true}
                                    />
                                    <img alt={product.name} src={product?.images.filter(image => image.is_main)[0]?.image_url} width={100} height={100} />
                                    <div style={{flex: "0 0 20%"}}>
                                        <p>{product.name}</p>
                                        <p style={{fontWeight: 600}}>{product.is_sale ? product.sale_price : product.price} {currency}</p>
                                    </div>
                                    <ShoppingCartProductRemoveButton onClick={() => handleProductRemove(product)}>
                                        X
                                    </ShoppingCartProductRemoveButton>
                                </ShoppingCartProductHeader>
                                <ShoppingCartProductFooter>
                                    {
                                        product?.measurements?.length > 0 &&
                                        <Select value={product?.selectedMeasurement?.id} onChange={(event) => handleMeasurementChange(event, product)}>
                                            {product.measurements.map(measurement => <option value={measurement.id} key={measurement.id}>{measurement.unit}</option>)}
                                        </Select>
                                    }
                                    {
                                        product?.variations?.length > 0 &&
                                        <Select value={product?.selectedVariation?.id} onChange={(event) => handleVariationChange(event, product)}>
                                            {product.variations.map(variation => <option value={variation.id} key={variation.id}>{variation.name}</option>)}
                                        </Select>
                                    }
                                </ShoppingCartProductFooter>
                            </ShoppingCartProductContainer>
                        </ShoppingCartProductListItem>
                    )
                })
            }
        </ShoppingCartProductListContainer>
    )
}

export default ShoppingCartProductList;

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"

import AddToShoppingCartIcon from "../../../assets/icons/react-icons/AddToShoppingCartIcon";

import SalePrice from "../../UI/SalePrice/SalePrice";

// import "./ProductCardFooter.style.css";
import QuantityControl from "../../UI/QuantityControl";
import {updateProduct} from "../../../store/actions/cart.action";

const ProductCardFooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    background-color: #ffffff;
`;

const ProductTitle = styled.h3 `
    font-size: 15px;
    line-height: 1.25;
    letter-spacing: -.01em;
    color: #333333;
    margin-bottom: .2rem;
    margin-top: 0;
    font-weight: 700;
`;

const ProductPrice = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 1.3rem;
    color: rgb(0, 158, 127);
`;

const ProductButton = styled.button`

    display: flex;
    align-items: center;
    border: 2px solid rgb(247, 247, 247);
    border-radius: 18px;
    height: 36px;
    padding-left: 17px;
    padding-right: 17px;
    font-size: 13px;
    font-weight: 700;
    color: rgb(0, 158, 127);
    background-color: rgb(255, 255, 255);
    transition: all 0.3s ease 0s;
    outline: none;
    cursor: pointer;
    
    :hover {
       color: rgb(255, 255, 255);
       background-color: rgb(0, 158, 127);
       svg {
        fill: rgb(255, 255, 255);
       }
    }
    svg {
        margin-right: 6px;
        fill: rgb(0, 158, 127);
    } 
`;

const ProductPriceAndButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

const ProductCardFooter = ({onAddProductClick, onRemoveProductClick, onTitleClick, inCart, product}) => {

    const { name, variations } = product;

    const {price, sale_price} =  variations[0] ? variations[0] : {};
    const {currency} = useSelector(state => state.shop)
    const cartItem = useSelector(state => state.cart.cartItems.filter(cartItem => cartItem.id === product.id))
    const dispatch = useDispatch();
    const productPrice = sale_price ? sale_price : price;
    const productCurrency = currency || '$';

    console.log(productPrice);

    const handleAddToCartClick = () => {
        onAddProductClick && onAddProductClick()
    }

    const handleQuantityChange = (quantity) => {
        if(quantity === 0) return onRemoveProductClick()
        dispatch(
            updateProduct({
                ...product,
                quantity
            })
        );
    }

    return (
        <ProductCardFooterContainer>
            <div onClick={onTitleClick}>
                <ProductTitle>{name}</ProductTitle>
            </div>
            <ProductPriceAndButtonContainer>
                <ProductPrice>
                    {!!sale_price && <SalePrice>{productPrice} {productCurrency}</SalePrice>}
                    {productPrice} {productCurrency}
                </ProductPrice>
                {
                    inCart ?
                        <QuantityControl quantity={cartItem.length > 0 && cartItem[0].quantity} min={0} onChange={handleQuantityChange} showLabel={false} />
                        :
                        <ProductButton onClick={inCart ? () => {} : handleAddToCartClick} active={inCart}>
                            <AddToShoppingCartIcon width={25} height={25} />
                            Korpa
                        </ProductButton>
                }
            </ProductPriceAndButtonContainer>
        </ProductCardFooterContainer>
    );
}

export default ProductCardFooter;

import React from 'react';
import {useSelector} from "react-redux";

import AddToShoppingCartIcon from "../../../assets/icons/react-icons/AddToShoppingCartIcon";
import AddedToShoppingCartIcon from "../../../assets/icons/react-icons/AddedToShoppingCartIcon";

import SalePrice from "../../UI/SalePrice/SalePrice";

import "./ProductCardFooter.style.css";

const ProductCardFooter = ({onAddProductClick, onRemoveProductClick, onTitleClick, inCart, product}) => {

    const {name, price, is_sale, sale_price} = product;
    const {currency} = useSelector(state => state.shop)
    const productPrice = is_sale ? sale_price : price;
    const productCurrency = currency || '$';

    const handleAddToCartClick = () => {
        onAddProductClick && onAddProductClick()
    }

    const handleRemoveFromCartClick = () => {
        onRemoveProductClick && onRemoveProductClick()
    }

    return (
        <div className="ProductCardFooter">
            <div onClick={onTitleClick}>
                <h3>{name}</h3>
            </div>
            <div className={"productPrice"}>
                {is_sale && <SalePrice>{price} $</SalePrice>}
                {productPrice} {productCurrency}
            </div>
            <button onClick={inCart ? handleRemoveFromCartClick : handleAddToCartClick} className={'ripple'}>
                {
                    inCart ?
                        <>
                            <AddedToShoppingCartIcon width={25} height={25} />
                            UKLONI IZ KORPE
                        </>
                        :
                        <>
                            <AddToShoppingCartIcon width={25} height={25} />
                            DODAJ U KORPU
                        </>
                }
            </button>
        </div>
    );
}

export default ProductCardFooter;

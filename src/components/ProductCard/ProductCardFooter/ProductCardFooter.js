import React from 'react';

import AddToShoppingCartIcon from "../../../assets/icons/react-icons/AddToShoppingCartIcon";
import AddedToShoppingCartIcon from "../../../assets/icons/react-icons/AddedToShoppingCartIcon";

import "./ProductCardFooter.style.css";
import SalePrice from "../../UI/SalePrice/SalePrice";

const ProductCardFooter = ({onAddProductClick, onRemoveProductClick, onTitleClick, inCart, product}) => {

    const {name, price, is_sale, sale_price, currency} = product;
    const productPrice = is_sale ? sale_price : price;

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
                {productPrice} {currency || '$'}
            </div>
            <button onClick={inCart ? handleRemoveFromCartClick : handleAddToCartClick}>
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

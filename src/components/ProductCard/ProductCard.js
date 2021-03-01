import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";

import ProductCardFooter from "./ProductCardFooter";
import Paper from "../UI/Paper";

import API from "../../API";
import {addProduct, removeProduct} from "../../store/actions/cart.action";

import './ProductCard.style.css';

const ProductCard = ({product}) => {

    const {name, url_name} = product;
    const {cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    let mainImage = product.images.filter(image => image.is_main)[0]
    if(!mainImage && product.images.length > 0) {
        mainImage = product.images[0];
    }
    const inCart = cartItems.filter(item => item.id === product.id).length > 0;

    const handleAddProductClick = () => {
        API.shopEvent({
            name: 'add_to_cart',
            category: 'cart',
            additional_data: JSON.stringify(product)
        });
        dispatch(addProduct(product))
        toast.success('Proizvod dodan u korpu');
    }

    const handleRemoveProductClick = () => {
        API.shopEvent({
            name: 'remove_from_cart',
            category: 'cart',
            additional_data: JSON.stringify(product)
        });
        dispatch(removeProduct(product));
        toast.success('Proizvod uklonjen iz korpe');
    }

    const handlePreviewClick = () => history.push(`/${url_name ? url_name : name}/preview`, {product});

    return (
        <Paper className="ProductCard">
            <div className={"imageContainer"} onClick={handlePreviewClick}>
                <img loading={"lazy"} width="300px" height="300px" alt={name} src={mainImage ?
                    mainImage.image_url : `https://via.placeholder.com/300?text=${encodeURI(name)}`}
                />
            </div>
            <ProductCardFooter
                product={product}
                inCart={inCart}
                onAddProductClick={handleAddProductClick}
                onRemoveProductClick={handleRemoveProductClick}
                onTitleClick={handlePreviewClick}
            />
        </Paper>
    )
}

export default ProductCard;

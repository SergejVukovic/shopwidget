import ProductCardFooter from "./ProductCardFooter";
import Paper from "../Paper";

import {CartContext} from "../../contexts/Cart/CartContext";
import {useContext} from "react";

import './ProductCard.style.css';

const ProductCard = ({product}) => {

    const {name} = product;
    const {addProduct, removeProduct, cartItems} = useContext(CartContext);

    const mainImage = product.images.filter(image => image.is_main)[0]
    const inCart = cartItems.filter(item => item.id === product.id).length > 0;

    const handleAddProductClick = () => {
        addProduct(product)
    }

    const handleRemoveProductClick = () => {
        removeProduct(product)
    }

    return (
        <Paper className="ProductCard">
            <div className={"imageContainer"}>
                <img width="300px" height="300px" alt={name} src={mainImage ? mainImage.image_url : `https://via.placeholder.com/300?text=${encodeURI(name)}`} />
            </div>
            <ProductCardFooter product={product} inCart={inCart} onAddProductClick={handleAddProductClick} onRemoveProductClick={handleRemoveProductClick} />
        </Paper>
    )
}

export default ProductCard;

import "./ProductCardPriceTag.style.css";

const ProductCardPriceTag = ({price}) => {
    return (
        <div className="ProductCardPriceTag">
            <div className="price">
                {price}
            </div>
        </div>
    )
}

export default ProductCardPriceTag;

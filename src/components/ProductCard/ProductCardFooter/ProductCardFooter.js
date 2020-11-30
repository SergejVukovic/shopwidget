import "./ProductCardFooter.style.css";
import AddToShoppingCartIcon from "../../../assets/icons/react-icons/AddToShoppingCartIcon";
import AddedToShoppingCartIcon from "../../../assets/icons/react-icons/AddedToShoppingCartIcon";

const ProductCardFooter = ({onAddProductClick, onRemoveProductClick, inCart, product}) => {

    const {name, price, is_sale, sale_price} = product;
    const productPrice = is_sale ? sale_price : price;

    const handleAddToCartClick = () => {
        onAddProductClick && onAddProductClick()
    }

    const handleRemoveFromCartClick = () => {
        onRemoveProductClick && onRemoveProductClick()
    }

    return (
        <div className="ProductCardFooter">
            <div>
                <h3>{name}</h3>
            </div>
            <div className={"productPrice"}>
                {is_sale && <span className={"sale_price"}>{price} $</span>}
                {productPrice} $
            </div>
            <button onClick={inCart ? handleRemoveFromCartClick : handleAddToCartClick}>
                {
                    inCart ?
                        <>
                            <AddedToShoppingCartIcon width={25} height={25} />
                            REMOVE FROM CART
                        </>
                        :
                        <>
                            <AddToShoppingCartIcon width={25} height={25} />
                            ADD TO CART
                        </>
                }
            </button>
        </div>
    );
}

export default ProductCardFooter;

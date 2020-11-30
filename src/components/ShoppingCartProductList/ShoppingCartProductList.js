import "./ShoppingCartProductList.style.css";
import {useContext} from "react";
import {CartContext} from "../../contexts/Cart/CartContext";

const ShoppingCartProductList = () => {

    const {cartItems, total, increase, decrease, removeProduct} = useContext(CartContext);

    const onIncrease = (product) => increase(product);
    const onDecrease = (product) => decrease(product);
    const onRemove = (product) => removeProduct(product);

    return (
        <div className={"ShoppingCartProductList"}>
            {
                cartItems.map(product => {
                    return (
                        <div key={product.id} className={"item"}>
                            {product.name} x {product.quantity}
                            <div>
                                <button onClick={() => onIncrease(product)}> + </button>
                                {
                                    product.quantity === 1 ?
                                        <button onClick={() => onRemove(product)}> X </button>
                                        :
                                        <button onClick={() => onDecrease(product)}> - </button>
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className={"total"}>
                Your total : {total} $
            </div>
        </div>
    )
}

export default ShoppingCartProductList;

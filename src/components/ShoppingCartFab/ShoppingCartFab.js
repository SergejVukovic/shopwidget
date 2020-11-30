import {useContext} from "react";
import ShoppingCartIcon from "../../assets/icons/react-icons/ShoppingCartIcon";
import {CartContext} from "../../contexts/Cart/CartContext";

import "./ShopingCartFab.style.css";
import ItemCounter from "./ItemCounter";

const ShoppingCartFab = ({toggleShoppingCart}) => {

    const {cartItems} = useContext(CartContext)

    return (
        <div className="ShoppingCartFab" onClick={toggleShoppingCart}>
            <ItemCounter itemCount={cartItems.length} />
            <ShoppingCartIcon width={25} height={25} fill={"#333"}  />
        </div>
    )
}

export default ShoppingCartFab;

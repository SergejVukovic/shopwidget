import React, {useContext} from "react";
import {useHistory} from "react-router-dom";

import ShoppingCartIcon from "../../assets/icons/react-icons/ShoppingCartIcon";
import {CartContext} from "../../contexts/Cart/CartContext";
import ItemCounter from "./ItemCounter";

import "./Menu.style.css";
import SearchIcon from "../../assets/icons/react-icons/SearchIcon";

const Menu = () => {

    const history = useHistory()
    const {cartItems} = useContext(CartContext)
    const showShoppingCart = () => history.push(`/cart`);
    const showFilterPage = () => history.push(`/filter`);

    return (
        <div className="Menu">
            <div onClick={showShoppingCart}>
                <ItemCounter itemCount={cartItems.length} />
                <ShoppingCartIcon width={25} height={25} fill={"#333"}  />
            </div>
            <div className={"line"} />
            <div onClick={showFilterPage}>
                <SearchIcon width={25} height={25} />
            </div>
        </div>
    )
}

export default Menu;

import React from "react";
import {useHistory, useRouteMatch, useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import ShoppingCartIcon from "../../assets/icons/react-icons/ShoppingCartIcon";

import ListIcon from "../../assets/icons/react-icons/ListIcon";
// import FilterIcon from "../../assets/icons/react-icons/FilterIcon";

import "./Menu.style.css";

const Menu = () => {

    const history = useHistory()
    const cartTotal = useSelector(state => state.cart.total);
    const currency = useSelector(state => state.shop.currency);
    const { url } = useRouteMatch();
    const {pathname} = useLocation();
    const {category} = useParams();

    const showShoppingCart = () => history.push(`/cart`);
    const showFilterPage = () => {
        pathname.includes('/menu')
        ?
            history.push(`/products/${category || 'all'}`)
            :
            history.push(`${url}/menu`);
    }

    return (
        <div className="Menu ripple">
            {/*<div onClick={showFilterPage} className={"MenuButton"} id={"filterButton"}>*/}
            {/*    <FilterIcon width={25} height={25} />*/}
            {/*    Filter*/}
            {/*</div>*/}
            <div onClick={showFilterPage} className={"MenuButton"} id={"categoryButton"}>
                <ListIcon width={25} height={25} />
                Meni
            </div>
            <div onClick={showShoppingCart} className={"MenuButton"}>
                <ShoppingCartIcon width={25} height={25} fill={"#333"}  />
                {
                    cartTotal > 0 && currency ?
                        `${cartTotal} ${currency}`
                        :
                        'Korpa'
                }
            </div>
        </div>
    )
}

export default Menu;

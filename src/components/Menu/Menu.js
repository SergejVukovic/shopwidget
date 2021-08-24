import React from "react";
import {useHistory, useRouteMatch, useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import styled from "styled-components";

import ShoppingCartIcon from "../../assets/icons/react-icons/ShoppingCartIcon";

import ListIcon from "../../assets/icons/react-icons/ListIcon";
// import FilterIcon from "../../assets/icons/react-icons/FilterIcon";

// import "./Menu.style.css";
import {desktopStyle, isDesktop} from "../../utils";

const MenuContainer = styled.div `
    width: calc(100% - 20px);
    bottom: 15px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background-color: rgb(0, 158, 127);
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 40px;
    color: #ffffff;
    
    ${desktopStyle(`
         width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        bottom: auto;
        position: fixed;
        right: 0;
        top: 50%;
        padding: 20px 0 20px 0;
        border-radius: 0;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        z-index: 999;
        left: auto;
    `)}
`;

const MenuButton = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 6px;
    cursor: pointer;
    &:focus-visible {
      outline: none !important;
    }
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;

`;

const CartButton = styled(MenuButton)`
   background-color: #ffffff;
   border-radius: 30px;
   padding-bottom: 10px;
   padding-top: 10px;
   width: calc(100% - 30px);
   margin-right: 5px;
   color: #333333;
   flex-direction: row;
   justify-content: space-evenly;
   cursor:pointer;
   
   ${desktopStyle(`
       flex-direction: column;
       width: auto;
       height: 100%;
       color: #fff;
       border-radius: 0;
       padding: 0;
       background-color: rgb(0, 158, 127);
       margin-right: 0;
       svg {
        fill: #fff; 
       }
   `)}
`;

const Menu = () => {

    const history = useHistory()
    const cartTotal = useSelector(state => state.cart.total);
    const currency = useSelector(state => state.shop.currency);
    const { url } = useRouteMatch();
    const {pathname} = useLocation();
    const {category, page} = useParams();

    const showShoppingCart = () => history.push(`/products/${category || 'all'}/page/${page || 1}/cart`);

    const showFilterPage = () => {
        pathname.includes('/menu')
        ?
            history.push(`/products/${category || 'all'}/page/1`)
            :
            history.push(`${url}/menu`);
    }

    return (
        <MenuContainer>
            {/*<div onClick={showFilterPage} className={"MenuButton"} id={"filterButton"}>*/}
            {/*    <FilterIcon width={25} height={25} />*/}
            {/*    Filter*/}
            {/*</div>*/}
            {
                !isDesktop() &&
                <MenuButton onClick={showFilterPage} id={"categoryButton"}>
                    <ListIcon width={25} height={25} fill="#fff" />
                    Meni
                </MenuButton>
            }
            <CartButton onClick={showShoppingCart}>
                <ShoppingCartIcon width={25} height={25} fill="#333"  />
                {
                    cartTotal > 0 && currency ?
                        `${cartTotal} ${currency}`
                        :
                        'Korpa'
                }
            </CartButton>
        </MenuContainer>
    )
}

export default Menu;

import React, {useEffect, useState} from "react";
import {Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";

import Products from "../Products";
import Menu from "../../components/Menu/Menu";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ProductPreview from "../ProductPreview";
import {CartContextProvider} from "../../contexts/Cart/CartContext";

import Filter from "../Filter/Filter";
import './App.css';
import {ProductsContextProvider} from "../../contexts/Products/ProductsContext";
import {ShopContextProvider} from "../../contexts/Shop/ShopContext";
import {getPersistentState} from "../../contexts/utils";
import API from "../../API";

function App() {

    const [filters, setFilters] = useState(null);
    const [shopInfo, setShopInfo] = useState(getPersistentState('shop_info') || null);

    useEffect(() => {
        if(!shopInfo) {
            API.shopRequest('',null,true)
                .then((shopData) => setShopInfo(shopData));
        }
    }, [shopInfo, setShopInfo]);

    return (
        <div className="App">
            <Toaster />
            <ShopContextProvider initialState={shopInfo}>
                <CartContextProvider>
                    <ProductsContextProvider>
                        <Route path={`/`} exact component={() => <Products filters={filters} />} />
                    </ProductsContextProvider>
                    <Route path={`/`} exact component={Menu} />
                    <Route path={`/cart`} exact component={ShoppingCart} />
                    <Route path={`/filter`} exact component={() => <Filter setFilters={setFilters} />} />
                    <Route path={`/:product/preview`} exact component={ProductPreview} />
                </CartContextProvider>
            </ShopContextProvider>
        </div>
      );
}

export default App;

import React, {useEffect, useState} from "react";
import {Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";

import Products from "../Products";
import Menu from "../../components/Menu/Menu";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ProductPreview from "../ProductPreview";
import CategoryMenu from "../../components/CategoryMenu";
import Filter from "../Filter/Filter";

import {ProductsContextProvider} from "../../contexts/Products/ProductsContext";
import {ShopContextProvider} from "../../contexts/Shop/ShopContext";
import {CartContextProvider} from "../../contexts/Cart/CartContext";

import './App.css';
import API from "../../API";

function App() {

    const [filters, setFilters] = useState(null);

    useEffect(() => {
        API.shopEvent({
            name: 'page_view',
            category: 'views'
        });
    }, []);

    return (
        <div className="App">
            <Toaster />
            <ShopContextProvider>
                <CartContextProvider>
                    <ProductsContextProvider>
                        <Route path={`/`} exact component={() => <Products filters={filters} />} />
                    </ProductsContextProvider>
                    <Route path={`/`} exact component={Menu} />
                    <Route path={`/`} exact component={() => <CategoryMenu setFilters={setFilters}/>} />
                    <Route path={`/cart`} exact component={ShoppingCart} />
                    <Route path={`/filter`} exact component={() => <Filter setFilters={setFilters} />} />
                    <Route path={`/:product/preview`} exact component={ProductPreview} />
                </CartContextProvider>
            </ShopContextProvider>
        </div>
      );
}

export default App;

import React, {useState} from "react";
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

function App() {

    const [filters, setFilters] = useState(null);

    return (
        <div className="App">
            <Toaster />
            <ShopContextProvider initialState={null}>
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

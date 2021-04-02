import React, {useEffect} from "react";
import {Route, Switch, Redirect, useParams} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";

import Products from "../Products";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ProductPreview from "../ProductPreview";
// import Filter from "../Filter/Filter";

import API from "../../API";
import {fetchShop} from "../../store/actions/shop.action";

import './App.css';

function App() {

    const dispatch = useDispatch();
    const {category, page} = useParams();

    useEffect(() => {
        API.shopEvent({
            name: 'page_view',
            category: 'views'
        });
    }, []);

    useEffect(() => {
        dispatch(fetchShop())
    }, [dispatch]);

    return (
        <div className="App">
            <Toaster />
            <Switch>
                <Route path={`/products/:category/page/:page`} component={Products} />
                <Route path={`/cart`} exact component={ShoppingCart} />
                <Route path={`/:product/preview`} exact component={ProductPreview} />
                <Redirect push to={`/products/${category || 'all'}/page/${page || 1}`} />
            </Switch>
        </div>
      );
}

export default App;

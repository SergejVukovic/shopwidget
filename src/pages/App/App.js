import React, {useEffect} from "react";
import {Route, Switch, Redirect, useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import styled from "styled-components";

import Products from "../Products";
import ProductPreview from "../ProductPreview";
// import Filter from "../Filter/Filter";

import API from "../../API";
import {fetchShop} from "../../store/actions/shop.action";

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: wrap;
  width: 100%;
  height:auto;
  padding-top: 32px;
  padding-bottom: 32px;
`;

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
        <AppContainer>
            <Switch>
                <Route path={`/products/:category/page/:page`} component={Products} />
                <Route path={`/:product/preview`} exact component={ProductPreview} />
                <Redirect push to={`/products/${category || 'all'}/page/${page || 1}`} />
            </Switch>
        </AppContainer>
      );
}

export default App;

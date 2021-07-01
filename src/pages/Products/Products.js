import React, {useEffect} from "react";
import {Route, useRouteMatch, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Helmet} from "react-helmet";
import styled from 'styled-components';

import ProductCard from "../../components/ProductCard";
import NoProducts from "../../components/UI/NoProducts";
import Menu from "../../components/Menu";
import CategoryMenu from "../../components/CategoryMenu";
import ThankYouModal from "../../components/ThankYouModal";

import {fetchProducts} from "../../store/actions/products.action";
import {desktopStyle, isDesktop} from "../../utils";

import Pagination from "../../components/UI/Pagination";
import ShoppingCart from "../ShoppingCart";

const ProductContainer = styled.div`

    display: ${props => props.hidden ? 'none' : 'flex'};
    flex-direction: column;
    flex-wrap: wrap;
    padding: 16px 16px 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
    
    ${desktopStyle(
        `  
            justify-content: space-evenly;
            flex-direction: row;
            padding-bottom: 0;
            flex: 1 0 70%;
        `
    )}
`;

const Products = () => {

    const {data: products, maxPages} = useSelector(state => state.products);
    const {categories, fetching: isShopFetching, name: shopName} = useSelector(state => state.shop);
    const filters = useSelector(state => state.filters);

    // const {pathname} = useLocation();
    const { category, page: currentPage } = useParams();
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const readableCategory = categories?.filter(cat => cat.url_name === category)[0]?.name;

    useEffect(() => {
        if(isShopFetching) return;
        let additionalFilters = {
            page: currentPage
        };
        if(category === "sale") {
            additionalFilters.sale = true;
        }
        const categoryId = categories?.filter(cat => cat.url_name === category)[0]?.id;
        dispatch(fetchProducts(categoryId, {...filters, ...additionalFilters}));
    }, [dispatch, filters, category, categories, isShopFetching, currentPage]);

    return (
        <>
            <Helmet>
                <title>{ `${shopName} | ${readableCategory || category}` }</title>
                <meta name={"og:title"} content={`${shopName} | ${readableCategory || category}`} />
            </Helmet>
            <Route path={path} component={Menu} />
            {
                isDesktop() ?
                    <Route path={path} component={CategoryMenu} />
                    :
                    <Route path={`${path}/menu`} component={CategoryMenu} />
            }
            <Route path={path} render={() => (
                <ProductContainer>
                    {
                        products.length === 0 ?
                            <NoProducts/>
                            :
                            products.map((product) => <ProductCard key={product.id} product={product} /> )
                    }
                </ProductContainer>
            )} />
            <Route path={`${path}/thank-you`} exact component={ThankYouModal} />
            {
                maxPages > 1 &&
                <Route path={path} component={() => <> <br/> <Pagination maxPages={maxPages} currentPage={currentPage} /> </>} />
            }
            <Route path={`${path}/cart`} exact component={ShoppingCart} />
        </>
    )
}

export default Products;

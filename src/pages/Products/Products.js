import React, {useContext, useEffect} from "react";
import {toast} from "react-hot-toast";

import ProductCard from "../../components/ProductCard";
import API from "../../API";

import "./Products.style.css";
import NoProducts from "../../components/UI/NoProducts";
import {ProductContext} from "../../contexts/Products/ProductsContext";
import {ShopContext} from "../../contexts/Shop/ShopContext";

const Products = ({filters}) => {

    const {addProducts, products} = useContext(ProductContext);
    const {currency} = useContext(ShopContext);

    useEffect(() => {

            toast.loading('Učitavanje...')

            API.shopRequest('product', {
                getParams: filters
            })
            .then((response => addProducts(response.data)))
            .catch(() => {
                toast.error('Došlo je do greške, molimo pokušajte kasnije.');
            })
                .finally(() => toast.remove());

    }, [filters]);

    return (
        <div className={'Products'}>
            {
                products.length === 0 ?
                    <NoProducts/>
                    :
                    products.map((product) => <ProductCard key={product.id} product={{...product, currency}} /> )
            }
        </div>
    )
}

export default Products;

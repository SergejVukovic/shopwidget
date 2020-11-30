import {useEffect, useState} from "react";

import "./Products.style.css";
import ProductCard from "../../components/ProductCard";
import API from "../../API";


const Products = () => {

    const [products, setProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchProducts () {
            const response = await API.request('product');
            setProducts(response.data);
        }

        fetchProducts()
            .catch(error => setError(error))
            .finally(() => setIsFetching(false));

    }, [setIsFetching, setProducts, setError]);

    return (
        <div id={"products"}>
            {isFetching && <div> Loading ... </div> }
            {
                products.map((product) => <ProductCard key={product.id} product={product} /> )
            }
        </div>
    )
}

export default Products;

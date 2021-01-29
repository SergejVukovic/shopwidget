import React, {useContext, useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from "react-hot-toast";

import {CartContext} from "../../contexts/Cart/CartContext";

import ImageGallery from "../../components/ImageGallery";
import SalePrice from "../../components/UI/SalePrice";
import QuantityControl from "../../components/UI/QuantityControl";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select/Select";

import AddToShoppingCartIcon from "../../assets/icons/react-icons/AddToShoppingCartIcon";
import AddedToShoppingCartIcon from "../../assets/icons/react-icons/AddedToShoppingCartIcon";

import "./ProductPreview.style.css";
import API from "../../API";
import Paper from "../../components/UI/Paper";
import {Helmet} from "react-helmet";
import {ShopContext} from "../../contexts/Shop/ShopContext";

const ProductPreview = () => {

    const history = useHistory();
    const params = useParams();
    const {addProduct, cartItems, removeProduct, updateProduct} = useContext(CartContext);
    const shop = useContext(ShopContext);

    const productCurrency = shop?.currency || '$';
    const passedProduct = history?.location?.state?.product;
    const inCartProduct = cartItems.filter(item => item.id === passedProduct.id)[0];

    const [product, setProduct] = useState(passedProduct || null);
    const [quantity, setQuantity] = useState(inCartProduct?.quantity || 1);
    const [selectedMeasurement, setSelectedMeasurement] = useState(product?.measurements[0]);

    useEffect(() => {
        if(!passedProduct && !product) {
            toast.loading('Učitavanje...');
            API.shopRequest(`product/${params.product}`, {name: params.product})
                .then((product) => {
                    setProduct(product);
                    toast.dismiss();
                });
        }
    }, [passedProduct, product, setProduct, params])

    useEffect(() => {
        return () => {
            document.head.querySelectorAll('[data-react-helmet=true]')
                .forEach(element => element.remove());
            document.title = document.title.split('|')[0];
        }
    }, [])

    const handleQuantityChange = (quantity) => {
        if(inCartProduct) {
            updateProduct({
                ...inCartProduct,
                quantity
            });
        }
        setQuantity(quantity);
    }

    const handleAddToCart = () => {
        const nextProduct = {
            ...product,
            quantity,
            selectedMeasurement
        }

        cartItems.filter(item => item.id === product.id).length > 0 ?
            updateProduct(nextProduct)
            :
            addProduct(nextProduct);

        toast.success('Proizvod dodan u korpu')
    };
    const handleCancel = () => history.push('/');
    const handleRemove = () => {
        removeProduct(product);
        toast.success('Proizvod uklonjen iz korpe')
    }
    const handleMeasurement = (event) => {
        setSelectedMeasurement(product.measurements.filter(measurement => measurement.id === Number(event.target.value))[0]);
    }
    const inCart = cartItems.filter(item => item.id === product.id).length > 0;

    return (
        <>
            <Helmet>
                <title>{document.title} | {product.name}</title>
                <meta name={"og:title"} content={`${document.title} | ${product.name}`} />
                <meta name={"description"} content={product.description} />
            </Helmet>
            <div className={"ProductPreview"}>
                <ImageGallery images={product.images} productName={product.name} />
                <Paper className={'ProductPreviewContent'}>
                    <div>
                        <h1>{product.name}</h1>
                        {product.is_sale ? <SalePrice>{product.sale_price} $</SalePrice>: <h2> {product.price} {productCurrency}</h2> }
                    </div>
                    <div>
                        {product.description}
                    </div>
                    <QuantityControl quantity={quantity} onChange={handleQuantityChange} min={1} />
                    {
                        product.measurements.length > 0 &&
                        <Select value={selectedMeasurement?.id} onChange={handleMeasurement}>
                            {product.measurements.map(measurement => <option value={measurement.id} key={measurement.id}>{measurement.unit}</option>)}
                        </Select>
                    }
                    <div>
                        <Button onClick={inCart ? handleRemove : handleAddToCart}>
                            {
                                inCart ?
                                    <>
                                        <AddedToShoppingCartIcon width={25} height={25} />
                                        UKLONI IZ KORPE
                                    </>
                                    :
                                    <>
                                        <AddToShoppingCartIcon width={25} height={25} />
                                        DODAJ U KORPU
                                    </>
                            }
                        </Button>
                        <Button onClick={handleCancel}>
                            Nazad
                        </Button>
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default ProductPreview;

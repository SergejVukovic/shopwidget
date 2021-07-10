import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

import ImageGallery from '../../components/ImageGallery';
import SalePrice from '../../components/UI/SalePrice';
import QuantityControl from '../../components/UI/QuantityControl';
import Select from '../../components/UI/Select/Select';

import AddToShoppingCartIcon from '../../assets/icons/react-icons/AddToShoppingCartIcon';
import AddedToShoppingCartIcon from '../../assets/icons/react-icons/AddedToShoppingCartIcon';

import API from '../../API';
import Paper from '../../components/UI/Paper';
import {
  addProduct,
  removeProduct,
  updateProduct,
} from '../../store/actions/cart.action';

import './ProductPreview.style.css';
import BackIcon from '../../assets/icons/react-icons/BackIcon';

const ProductPreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    z-index: 9990;
    background-color: #ffffff;
    left: 0;
    bottom: 0;
    right: 0;
`;

const BottomNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 10px;
    height: 50px;
    width: calc(100% - 20px);
    background-color: #019e7f;
    position: fixed;
    z-index: 999;
    border-radius: 32px;
`;

const NavBarButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #019e7f;
  border: none;
  color: #fff;
  margin-left: 4px;
  border-radius: 32px;
  padding: 8px;
`;

const NavBarCartButton = styled(NavBarButton)`
  background-color: #fff;
  color: #019e7f;
  font-weight: 600;
  margin-right: 4px;
  svg {
    fill: #019e7f;
    margin-right: 6px;
  }
`;

const ProductPreview = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const {
    shop,
    cart: {cartItems},
  } = useSelector((state) => state);

  const productCurrency = shop?.currency || '$';
  const passedProduct = history?.location?.state?.product;
  const inCartProduct = cartItems.filter(
    (item) => item.id === passedProduct.id
  )[0];

  const [product, setProduct] = useState(passedProduct || null);
  const [quantity, setQuantity] = useState(inCartProduct?.quantity || 1);
  const [selectedMeasurement, setSelectedMeasurement] = useState(
    product?.measurements ? product.measurements[0] : 0
  );
  const [selectedVariation, setSelectedVariation] = useState(
    product?.variations ? product.variations[0] : 0
  );
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (!passedProduct && !product) {
      toast.loading('Učitavanje...');
      API.shopRequest(`product`, {getParams: {url_name: params.product}}).then(
        (product) => {
          setProduct(product.data[0]);
          toast.dismiss();
        }
      );
    }
  }, [passedProduct, product, setProduct, params]);

  useEffect(() => {
    const hiddenState = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.title = document.title.split('|')[0];
      document.body.style.overflow = hiddenState;
    };
  }, []);

  const handleQuantityChange = (quantity) => {
    if (inCartProduct) {
      dispatch(
        updateProduct({
          ...inCartProduct,
          quantity,
        })
      );
    }
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    const nextProduct = {
      ...product,
      quantity,
      selectedMeasurement,
      selectedVariation,
    };

    cartItems.filter((item) => item.id === product.id).length > 0
      ? dispatch(updateProduct(nextProduct))
      : dispatch(addProduct(nextProduct));

    API.shopEvent({
      name: 'add_to_cart',
      category: 'cart',
      additional_data: JSON.stringify(product),
    });

    setIsInCart(true);
    toast.success('Proizvod dodan u korpu');
  };
  const handleCancel = () => history.push('/');
  const handleRemove = () => {
    API.shopEvent({
      name: 'remove_from_cart',
      category: 'cart',
      additional_data: JSON.stringify(product),
    });
    dispatch(removeProduct(product));
    toast.success('Proizvod uklonjen iz korpe');
  };
  const handleMeasurement = (event) => {
    setSelectedMeasurement(
      product.measurements.filter(
        (measurement) => measurement.id === Number(event.target.value)
      )[0]
    );

    if (isInCart) {
      handleAddToCart();
    }
  };

  const handleVariation = (event) => {
    setSelectedVariation(
      product.variations.filter(
        (variation) => variation.id === Number(event.target.value)
      )[0]
    );

    if (isInCart) {
      handleAddToCart();
    }
  };

  const inCart = cartItems.filter((item) => item.id === product.id).length > 0;

  if (!product?.name) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{` ${document.title} | ${product.name} `}</title>
        <meta name={'og:title'} content={`${shop.name} | ${product.name}`} />
        <meta name={'description'} content={product.description} />
        <meta property="og:image" content={product.images[0]?.image_url} />
      </Helmet>
      <ProductPreviewContainer>
        <ImageGallery images={product.images} productName={product.name} />
        <Paper className={'ProductPreviewContent'}>
          <div>
            <h1>{product.name}</h1>
            {product.is_sale ? (
              <>
                <SalePrice>{`${product.price} ${productCurrency}`}</SalePrice>
                <h2>{`${product.sale_price} ${productCurrency}`}</h2>
              </>
            ) : (
              <h2 className={'ProductPrice'}>
                {product.price} {productCurrency}
              </h2>
            )}
          </div>
          <div className={'ProductDesc'}>{product.description}</div>
          <QuantityControl
            quantity={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
          {product?.measurements?.length > 0 && (
            <Select
              className={'ProductMeasurments'}
              value={selectedMeasurement?.id}
              onChange={handleMeasurement}
            >
              {product.measurements.map((measurement) => (
                <option value={measurement.id} key={measurement.id}>
                  {measurement.unit}
                </option>
              ))}
            </Select>
          )}
          {product?.variations?.length > 0 && (
            <Select
              className={'ProductMeasurments'}
              value={selectedVariation?.id}
              onChange={handleVariation}
            >
              {product.variations.map((variation) => (
                <option value={variation.id} key={variation.id}>
                  {variation.name}
                </option>
              ))}
            </Select>
          )}
        </Paper>
        <BottomNavBar>
          <NavBarButton onClick={handleCancel}>
            <BackIcon width={30} height={30} fill="#fff" />
          </NavBarButton>
          <NavBarCartButton onClick={inCart ? handleRemove : handleAddToCart} >
            {inCart ? (
                <>
                  <AddedToShoppingCartIcon width={25} height={25} />
                  UKLONI IZ KORPE
                </>
            ) : (
                <>
                  <AddToShoppingCartIcon width={25} height={25} />
                  DODAJ U KORPU
                </>
            )}
          </NavBarCartButton>
        </BottomNavBar>
      </ProductPreviewContainer>
    </>
  );
};

export default ProductPreview;

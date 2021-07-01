import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";

import ShoppingCartProductList from "../../components/ShoppingCartProductList";
import BillingInformationForm from "../../components/BillingInformationForm";

import API from "../../API";

import {toast} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../store/actions/cart.action";
import ShoppingCartIcon from "../../assets/icons/react-icons/ShoppingCartIcon";
import {desktopStyle} from "../../utils";

const ShoppingCartContainer = styled.div `
    @keyframes slideInFromBottom {
        from {
            height: 0;
        }
        to {
            height: calc(100% - 200px);
        }
    }
    animation: slideInFromBottom linear 0.2s;
     
    position: fixed;
    background-color: #ffffff;
    z-index: 9990;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    height: calc(100% - 200px);
    border-top: 0.1rem solid #ebebeb;
    
    ${desktopStyle(`
         max-width: 700px;
        left: 0;
        right: 0;
        margin: auto;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        justify-content: flex-end;
        max-height: 500px;
    `)}
`;

const ShoppingCartNavigation = styled.div`
    width: calc(100% - 20px);
    background-color: rgb(0, 158, 127);
    height: 45px;
    left: 0;
    right: 0;
    margin: 7px auto 10px auto;
    border-radius: 30px;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    
    ${desktopStyle(``)}
`;

const ShoppingCartTotal = styled.div`
   background-color: #fff;
   padding: 12px;
   color: rgb(0, 158, 127);
   border-radius: 30px;
   margin-right: 1px;
   font-weight: 600;
   
   ${desktopStyle(`
       padding: 7px;
   `)}
`;

const ShoppingCartCheckout = styled.div`
  font-weight: 600;
  margin-left: 16px;
  cursor:pointer;
`;

const ShoppingCartBillingInfoButton = styled.button`
    border: none;
    background-color: rgb(0, 158, 127);
    color: white;
    margin-left: 16px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
`;

const ShoppingCartBackdrop = styled.div`
    @keyframes fadeInTransition {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    animation: fadeInTransition linear 0.2s;
    height: 100%;
    background-color: rgb(0 0 0 / 57%);
    position: fixed;
    top: 0;
    width: 100%;
    
   ${desktopStyle(`
    height: 100%;
    z-index: 999;
   `)}
`;

const ShoppingCartCloseButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 200px;
    ${desktopStyle(`
        height: 500px;
    `)}
`;

const ShoppingCartCloseButton = styled.div`
    width: 35px;
    height: 35px;
    background: #fff;
    border-radius: 100px;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
`;

const ShoppingCartHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1rem solid #ebebeb;
  color: rgb(0, 158, 127);
  font-weight: bold;
  svg {
    fill: rgb(0, 158, 127);
    margin-right: 10px;
  }
`;

const DeliveryContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 70px;
`;

const DeliverySelect = styled.select`
    height: 40px;
    border: 0.1rem solid #c1c1c1;
    margin-right: 26px;
`;

const ShoppingCart = () => {

    const { cart: {cartItems, total}, shop} = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory()
    const { category, page } = useParams();
    const productCurrency = shop?.currency || "$";
    const [showBillingInformation, setShowBillingInformation] = useState(false);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(0);

    useEffect(() => {
        const hiddenState = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = hiddenState;
        }
    }, [])

    const toggleBillingInformation = () => setShowBillingInformation(!showBillingInformation);

    const closeShoppingCart = (event, isOrderDone = false) => {

        if(!showBillingInformation && cartItems.length > 0) {
            API.shopEvent({
                name: 'order_abandoned',
                category: 'order',
            });
        }

        isOrderDone ?
            history.push('/products/all/page/1/thank-you')
            :
            history.push(`/products/${category || 'all'}/page/${page || 1}`);

    }

    const generateProductIds = () => {
        const productIds = [];
        cartItems.forEach(item => {
           if(item.quantity > 1) {
               for (let i = 0; i < item.quantity; i++) {
                   productIds.push(item.id);
               }
           }else{
               productIds.push(item.id);
           }
        });
        return productIds;
    }

    const generateProductsMeasurements = () => {
        const productMeasurements = [];

        cartItems.forEach(item => {

            const measurement = item.selectedMeasurement ? item.selectedMeasurement : item?.measurements[0]

            if(!measurement) return;

            if(item.quantity > 1) {
                for (let i = 0; i < item.quantity; i++) {
                    productMeasurements.push({
                        productId: item.id,
                        measurementId: measurement.id
                    });
                }
            }else{
                productMeasurements.push({
                    productId: item.id,
                    measurementId: measurement.id
                });
            }
        });
        return productMeasurements;
    }

    const generateProductVariations = () => {
        const productVariations = [];

        cartItems.forEach(item => {

            const variation = item.selectedVariation ? item.selectedVariation : item?.variations[0]

            if(!variation) return;

            if(item.quantity > 1) {
                for (let i = 0; i < item.quantity; i++) {
                    productVariations.push({
                        productId: item.id,
                        variationId: variation.id
                    });
                }
            }else{
                productVariations.push({
                    productId: item.id,
                    variationId: variation.id
                });
            }
        });
        return productVariations;
    }

    const handleBillingInformationSubmit = async (billingInformation) => {

        if(cartItems.length <= 0) {
            toast.error('0 proizvoda u korpi, dodajte proizvode prije slanja narudzbe !');
            return;
        }

        const deliveryTypeId = (shop.delivery_types.length > 0) && !selectedDeliveryType?.id ? shop.delivery_types[0] : selectedDeliveryType

        try {
             API.shopRequest('order', {
                method: 'POST',
                body: JSON.stringify({
                    ...billingInformation,
                    productIds: generateProductIds(),
                    productsMeasurements: generateProductsMeasurements(),
                    productsVariations: generateProductVariations(),
                    delivery_type_id: deliveryTypeId?.id || 0
                })
            }).then((order) => {
                 API.shopEvent({
                     name: 'order_confirmed',
                     category: 'order',
                     additional_data: JSON.stringify(order)
                 });
                 dispatch(clearCart());
                 closeShoppingCart({}, true);
             });
        }catch (error) {
            toast.error('Došlo je do greške, molimo pokušajte kasnije.')
            closeShoppingCart();
        }

    };

    const handleDeliveryTypeChange = (event) => {
        const deliveryType = shop.delivery_types.filter(type => type.id === Number(event.target.value))[0];
        setSelectedDeliveryType(deliveryType);
    }

    const cartTotalAndShipping = Number(total) + Number((selectedDeliveryType?.price || 0));

    return (
        <>
        <ShoppingCartBackdrop>
            <ShoppingCartCloseButtonContainer>
                <ShoppingCartCloseButton onClick={closeShoppingCart}>
                    X
                </ShoppingCartCloseButton>
            </ShoppingCartCloseButtonContainer>
        </ShoppingCartBackdrop>
        <ShoppingCartContainer>
            <ShoppingCartHeader>
                <ShoppingCartIcon width={25} height={25} fill="#333"  /> {cartItems.length} Proizvoda
            </ShoppingCartHeader>
                {
                    showBillingInformation ?
                        <BillingInformationForm onSubmit={handleBillingInformationSubmit} />
                        :
                        <ShoppingCartProductList cartItems={cartItems} currency={productCurrency}/>
                }
                {
                    (shop.delivery_types.length && showBillingInformation) &&
                    <DeliveryContainer>
                        <label>
                            Nacin dostave
                        </label>
                        <DeliverySelect
                            name={"delivery type selection"}
                            onChange={handleDeliveryTypeChange}
                            value={selectedDeliveryType.id || shop.delivery_types[0].id}
                            className={'deliverySelect'}
                        >
                            {
                                shop.delivery_types.map((deliveryType) => (
                                        <option key={deliveryType.id} value={deliveryType.id}> {deliveryType.name} </option>
                                    )
                                )
                            }
                        </DeliverySelect>
                    </DeliveryContainer>
                }
            <ShoppingCartNavigation>
                {
                    !showBillingInformation ?
                        <ShoppingCartCheckout onClick={toggleBillingInformation}>
                            Dalje
                        </ShoppingCartCheckout>
                        :
                        <ShoppingCartBillingInfoButton type="submit" form={"billingInformationForm"}>
                            Potvrdi Narudzbu
                        </ShoppingCartBillingInfoButton>
                }
                <ShoppingCartTotal>
                    {cartTotalAndShipping} {productCurrency}
                </ShoppingCartTotal>
                {/*<div className={"total"}>*/}
                {/*    {*/}
                {/*        showBillingInformation &&*/}
                {/*            <span>  Dostava : {selectedDeliveryType.price || 0 } {productCurrency}  </span>*/}
                {/*    }*/}
                {/*    <span>  Ukupno : { cartTotalAndShipping } {productCurrency} </span>*/}
                {/*</div>*/}
                {/*<div className={"shoppingCartButtons"}>*/}
                {/*    {*/}
                {/*        showBillingInformation ?*/}
                {/*            <>*/}
                {/*                <Button type="submit" form={"billingInformationForm"}> Potvrdi Narudzbu </Button>*/}
                {/*                <Button onClick={toggleBillingInformation}>Nazad</Button>*/}
                {/*            </>*/}
                {/*            :*/}
                {/*            <>*/}
                {/*                <Button onClick={toggleBillingInformation}>Dalje</Button>*/}
                {/*                <Button onClick={closeShoppingCart}>Zatvori</Button>*/}
                {/*            </>*/}
                {/*    }*/}
                {/*</div>*/}
            </ShoppingCartNavigation>
        </ShoppingCartContainer>
        </>
    )
};

export default ShoppingCart;

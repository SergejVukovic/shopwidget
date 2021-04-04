import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import ShoppingCartProductList from "../../components/ShoppingCartProductList";
import BillingInformationForm from "../../components/BillingInformationForm";
import Paper from "../../components/UI/Paper";
import Button from "../../components/UI/Button/Button";

import API from "../../API";

import "./ShoppingCart.style.css";
import {toast} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../store/actions/cart.action";

const ShoppingCart = () => {

    const { cart: {cartItems, total}, shop} = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory()
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
            history.goBack();

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
        <div className="ShoppingCart">
            <Paper className="content">
                {
                    showBillingInformation ?
                        <BillingInformationForm onSubmit={handleBillingInformationSubmit} />
                        :
                        <ShoppingCartProductList cartItems={cartItems} currency={productCurrency}/>
                }
                {
                    (shop.delivery_types.length && showBillingInformation) &&
                    <div className={'deliveryType'}>
                        <label>
                            Odaberite nacin dostave
                        </label>
                        <select
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
                        </select>
                    </div>
                }
            </Paper>
            <Paper className="navigationButtons">
                <div className={"total"}>
                    {
                        showBillingInformation &&
                            <span>  Dostava : {selectedDeliveryType.price || 0 } {productCurrency}  </span>
                    }
                    <span>  Ukupno : { cartTotalAndShipping } {productCurrency} </span>
                </div>
                <div className={"shoppingCartButtons"}>
                    {
                        showBillingInformation ?
                            <>
                                <Button type="submit" form={"billingInformationForm"}> Potvrdi Narudzbu </Button>
                                <Button onClick={toggleBillingInformation}>Nazad</Button>
                            </>
                            :
                            <>
                                <Button onClick={toggleBillingInformation}>Dalje</Button>
                                <Button onClick={closeShoppingCart}>Zatvori</Button>
                            </>
                    }
                </div>
            </Paper>
        </div>
    )
};

export default ShoppingCart;

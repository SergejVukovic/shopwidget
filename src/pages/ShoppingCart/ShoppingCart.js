import React, {useState} from "react";
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

    const toggleBillingInformation = () => setShowBillingInformation(!showBillingInformation);

    const closeShoppingCart = () => {

        if(!showBillingInformation && cartItems.length > 0) {

            API.shopEvent({
                name: 'order_abandoned',
                category: 'order',
            });
        }

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

        try {
            toast.loading();
             API.shopRequest('order', {
                method: 'POST',
                body: JSON.stringify({
                    ...billingInformation,
                    productIds: generateProductIds(),
                    productsMeasurements: generateProductsMeasurements()
                })
            }).then((order) => {
                 API.shopEvent({
                     name: 'order_confirmed',
                     category: 'order',
                     additional_data: JSON.stringify(order)
                 });
             });
        }catch (error) {
            toast.error('Došlo je do greške, molimo pokušajte kasnije.')
            return;
        }

        toast.dismiss();
        dispatch(clearCart());
        closeShoppingCart();
        toast.success('Narudzba poslana !');
    };

    return (
        <div className="ShoppingCart">
            <Paper>
            {
                showBillingInformation ?
                    <BillingInformationForm onSubmit={handleBillingInformationSubmit} />
                    :
                    <ShoppingCartProductList cartItems={cartItems} />
            }
            <div className={"total"}>
                Ukupno : {total} {productCurrency}
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

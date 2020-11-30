import "./ShoppingCart.style.css";
import {CartContext} from "../../contexts/Cart/CartContext";
import {useContext, useState} from "react";
import API from "../../API";
import ShoppingCartProductList from "../../components/ShoppingCartProductList";
import BillingInformationForm from "../../components/BillingInformationForm";
import Paper from "../../components/Paper";

const ShoppingCart = ({toggleShoppingCart, setToast}) => {

    const {cartItems, clearCart} = useContext(CartContext);

    const [showBillingInformation, setShowBillingInformation] = useState(false);

    const toggleBillingInformation = () => setShowBillingInformation(!showBillingInformation);

    const generateProductIds = () => {
        let productIds = [];
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

    const handleBillingInformationSubmit = async (billingInformation) => {
        try {
             API.request('order', {
                method: 'POST',
                body: JSON.stringify({
                    ...billingInformation,
                    productIds: generateProductIds()
                })
            });
        }catch (error) {
            setToast({
                show: true,
                variant: 'error',
                message: 'Something happened, please try again later'
            })
            return;
        }

        clearCart();
        toggleShoppingCart();
        setToast({
            show: true,
            variant: 'success',
            message: 'Order sent'
        })
    };

    return (
        <div className="ShoppingCart">
            <Paper>

            {
                showBillingInformation ?
                    <BillingInformationForm onSubmit={handleBillingInformationSubmit} />
                    :
                    <ShoppingCartProductList />
            }
            <div className={"shoppingCartButtons"}>
                {
                    showBillingInformation ?
                        <button type="submit" form={"billingInformationForm"}> Confirm Order </button>
                        :
                        <button onClick={toggleBillingInformation}>Checkout</button>
                }
                <button onClick={toggleShoppingCart}>Close</button>
            </div>
            </Paper>
        </div>
    )
};

export default ShoppingCart;

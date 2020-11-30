
import Products from "../Products";
import ShoppingCartFab from "../../components/ShoppingCartFab/ShoppingCartFab";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

import {CartContextProvider} from "../../contexts/Cart/CartContext";

import './App.css';
import {useEffect, useState} from "react";
import Toast from "../../components/Toast";

const initToast = {
    show: false,
    variant: 'success',
    message: ''
}

function App() {

    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const [toast, setToast] = useState(initToast);

    useEffect(() => {
        if(toast.show) {
            setTimeout(() => {
                setToast(initToast)
            }, 3000);
        }
    }, [toast, setToast])

    const toggleShoppingCart = () => {
        setShowShoppingCart(!showShoppingCart);
    }

      return (
        <div className="App">
            {toast.show && <Toast message={toast.message} variant={toast.variant} />}
            <CartContextProvider>
                <Products />
                <ShoppingCartFab toggleShoppingCart={toggleShoppingCart} />
                {  showShoppingCart && <ShoppingCart toggleShoppingCart={toggleShoppingCart} setToast={setToast} />}
            </CartContextProvider>
        </div>
      );
}

export default App;

import {useReducer, createContext} from 'react';
import {CartReducer, ADD_PRODUCT, CLEAR, DECREASE, INCREASE, REMOVE_PRODUCT} from "./CartReducer";

const CartContext = createContext();
const initialState = { cartItems: [] };

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const increase = product => {
        dispatch({type: INCREASE, product})
    }

    const decrease = product => {
        dispatch({type: DECREASE, product})
    }

    const addProduct = product => {
        dispatch({type: ADD_PRODUCT, product})
    }

    const removeProduct = product => {
        dispatch({type: REMOVE_PRODUCT, product})
    }

    const clearCart = () => {
        dispatch({type: CLEAR})
    }

    const contextValues = {
        removeProduct,
        addProduct,
        increase,
        decrease,
        clearCart,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            { children }
        </CartContext.Provider>
    );
}

export {CartContextProvider, CartContext};

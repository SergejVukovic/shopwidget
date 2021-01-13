import React, {useReducer, createContext, useEffect} from 'react';
import {CartReducer, ADD_PRODUCT, CLEAR, DECREASE, INCREASE, REMOVE_PRODUCT, UPDATE_PRODUCT} from "./CartReducer";
import {getPersistentState, persistState} from "../utils";

const CartContext = createContext();
const initialState = getPersistentState('cart') || { cartItems: [] };

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

    const updateProduct = product => {
        dispatch({type: UPDATE_PRODUCT, product})
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
        updateProduct,
        increase,
        decrease,
        clearCart,
        ...state
    }

    useEffect(() => persistState('cart', state), [state]);

    return (
        <CartContext.Provider value={contextValues} >
            { children }
        </CartContext.Provider>
    );
}

export {CartContextProvider, CartContext};

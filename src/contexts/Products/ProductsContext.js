import React, {useReducer, createContext, useEffect} from 'react';
import {FETCH_FINISH, ProductReducer} from "./ProductsReducer";
import {getPersistentState, persistState} from "../utils";

const ProductContext = createContext();
const initialState = getPersistentState('products') || { products: [] };

const ProductsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState)

    const addProducts = (products) => dispatch({
        type: FETCH_FINISH,
        products
    });

    const contextValues = {
        ...state,
        addProducts,
    }

    useEffect(() => persistState('products', state), [state]);

    return (
        <ProductContext.Provider value={contextValues} >
            { children }
        </ProductContext.Provider>
    );
}

export {ProductsContextProvider, ProductContext};

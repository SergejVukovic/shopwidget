import React, {useReducer, createContext, useEffect} from 'react';
import {FETCH_FINISH, ShopReducer} from "./ShopReducer";
import {persistState} from "../utils";

const ShopContext = createContext();

const ShopContextProvider = ({children, initialState}) => {

    const [state, dispatch] = useReducer(ShopReducer, initialState)

    const addShopInfo = (products) => dispatch({
        type: FETCH_FINISH,
        products
    });

    const contextValues = {
        ...state,
        addShopInfo,
    }

    useEffect(() => persistState('shop_info', state), [state]);

    return (
        <ShopContext.Provider value={contextValues} >
            { children }
        </ShopContext.Provider>
    );
}

export {ShopContextProvider, ShopContext};

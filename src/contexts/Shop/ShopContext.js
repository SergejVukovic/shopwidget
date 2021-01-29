import React, {useReducer, createContext, useEffect} from 'react';
import {FETCH_FINISH, ShopReducer} from "./ShopReducer";
import {getPersistentState, persistState} from "../utils";
import API from "../../API";

const ShopContext = createContext();
const initialState = getPersistentState('shop_info') || { shop: null };


const ShopContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ShopReducer, initialState);

    useEffect(() => {
        API.shopRequest('', null, true)
            .then((shopData) => {
                dispatch({
                    type: FETCH_FINISH,
                    shop: shopData
                })
            });
    }, [dispatch]);

    useEffect(() => persistState('shop_info', state), [state]);

    const addShopInfo = (shop) => dispatch({
        type: FETCH_FINISH,
        shop
    });

    const contextValues = {
        ...state,
        addShopInfo,
    }

    return (
        <ShopContext.Provider value={contextValues} >
            { children }
        </ShopContext.Provider>
    );
}

export {ShopContextProvider, ShopContext};

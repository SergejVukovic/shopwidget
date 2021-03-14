import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

import productsReducer from "./products.reducer";
import shopReducer from "./shop.reducer";
import cartReducer from "./cart.reducer";
import filterReducer from "./filter.reducer";

const allReducers = combineReducers({
    products: productsReducer,
    shop: shopReducer,
    cart: cartReducer,
    filters: filterReducer
});

const rootReducer = (state, action) => {
    return allReducers(state, action);
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

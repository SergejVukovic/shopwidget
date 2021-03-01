import {combineReducers} from 'redux';
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

export default rootReducer

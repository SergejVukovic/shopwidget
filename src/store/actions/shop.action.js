import API from "../../API";
import {FETCH_FAILED_SHOP, FETCH_FINISH_SHOP, FETCH_START_SHOP, SET_CATEGORIES} from "../reducers/shop.reducer";

export function fetchShop() {
    return (dispatch) => {

        dispatch({type: FETCH_START_SHOP});

        API.shopRequest('', null, true)
            .then((response) => {
                API.shopRequest('category')
                    .then(categories => {
                        dispatch({type: FETCH_FINISH_SHOP, shop: {...response, categories}});
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                dispatch({type: FETCH_FAILED_SHOP, error});
            });
    }
}


export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

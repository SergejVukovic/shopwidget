import API from "../../API";
import {toast} from "react-hot-toast";
import {
    FETCH_FAILED_PRODUCTS,
    FETCH_FINISH_PRODUCTS,
    FETCH_START_PRODUCTS, SET_MAX_PAGES,
    SET_PAGE
} from "../reducers/products.reducer";

export function fetchProducts(category = 'all', filters) {

    return (dispatch) => {

        dispatch({type: FETCH_START_PRODUCTS});
        toast.loading('Učitavanje...')

        API.shopRequest('product', {
            getParams: {
                ...filters,
                category
            }
        })
            .then((response) => {
                dispatch({type: FETCH_FINISH_PRODUCTS, products: response.data});
                dispatch(setMaxPages(response.last_page));
            })
            .catch((error) => {
                dispatch({type: FETCH_FAILED_PRODUCTS, error});
                toast.error('Došlo je do greške, molimo pokušajte kasnije.');
            })
            .finally(() => {
                toast.remove();
            });
    }
}

export function setPage(nextPage) {
    return {
        type: SET_PAGE,
        page: nextPage
    }
}

export function setMaxPages(maxPages) {
    return {
        type: SET_MAX_PAGES,
        maxPages
    }
}

export const FETCH_START_PRODUCTS = 'FETCH_START_PRODUCTS';
export const FETCH_FINISH_PRODUCTS = 'FETCH_FINISH_PRODUCTS';
export const FETCH_FAILED_PRODUCTS = 'FETCH_FAILED_PRODUCTS';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const SET_PAGE = 'SET_PAGE';
export const SET_MAX_PAGES = 'SET_MAX_PAGES';

const defaultState = {
    page: 1,
    maxPages: 1,
    data: []
}

function productsReducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_START_PRODUCTS: {
            return {
                ...state,
                fetching: true
            }
        }
        case FETCH_FINISH_PRODUCTS: {
            return {
                ...state,
                fetching: false,
                data: action.products
            };
        }
        case FETCH_FAILED_PRODUCTS: {
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        }
        case SET_PAGE: {
            return  {
                ...state,
                page: action.page
            }
        }
        case SET_MAX_PAGES:
            return {
                ...state,
                maxPages: action.maxPages
            }
        case CLEAR_PRODUCTS: {
            return {
                ...state,
                page: 1,
                maxPages: 1,
                data: []
            }
        }
        default:
            return state;
    }
}


export default productsReducer;

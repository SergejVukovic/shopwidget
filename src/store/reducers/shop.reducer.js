export const FETCH_START_SHOP = 'FETCH_START_SHOP';
export const FETCH_FINISH_SHOP = 'FETCH_FINISH_SHOP';
export const FETCH_FAILED_SHOP = 'FETCH_FAILED_SHOP';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const CLEAR_SHOP = 'CLEAR_SHOP';

const defaultState = {}

function shopReducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_START_SHOP: {
            return {
                ...state,
                fetching: true
            }
        }
        case FETCH_FINISH_SHOP: {
            return {
                ...state,
                fetching: false,
                ...action.shop
            };
        }
        case FETCH_FAILED_SHOP: {
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        }

        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case CLEAR_SHOP: {
            return {}
        }

        default:
            return state;
    }
}


export default shopReducer;

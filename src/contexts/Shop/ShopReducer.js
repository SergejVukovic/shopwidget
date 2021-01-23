export const FETCH_START = 'FETCH_START';
export const FETCH_FINISH = 'FETCH_FINISH';
export const FETCH_FAILED = 'FETCH_FAILED';
export const CLEAR = 'CLEAR';

export const ShopReducer = (state, action) => {
    switch (action.type) {
        case FETCH_START: {
            return {
                ...state,
                fetching: true
            }
        }

        case FETCH_FINISH: {
            return {
                ...state,
                fetching: false,
                shop: action.products
            };
        }
        case FETCH_FAILED: {
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        }

        case CLEAR: {
            return {
                ...state,
                shop: null
            }
        }

        default:
            return state

    }
}

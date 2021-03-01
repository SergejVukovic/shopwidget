export const SET_FILTERS = "SET_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

const defaultState = {}

function filterReducer(state = defaultState, action) {
    switch (action.type) {

        case SET_FILTERS: {
            return {
                ...action.filters
            }
        }

        case CLEAR_FILTERS: {
            return {}
        }

        default:
            return state;
    }
}


export default filterReducer;

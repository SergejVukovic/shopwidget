import {CLEAR_FILTERS, SET_FILTERS} from "../reducers/filter.reducer";

export function setFilters(filters) {
    return {
        type: SET_FILTERS,
        filters
    }
}

export function clearFilters() {
    return {
        type: CLEAR_FILTERS
    }
}

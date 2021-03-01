import {ADD_PRODUCT, CLEAR, DECREASE, INCREASE, REMOVE_PRODUCT, UPDATE_PRODUCT} from "../reducers/cart.reducer";

export const increase = product => dispatch => {
    dispatch({type: INCREASE, product})
}

export const decrease = product => dispatch => {
    dispatch({type: DECREASE, product})
}

export const addProduct = product => dispatch => {
    dispatch({type: ADD_PRODUCT, product})
}

export const updateProduct = product => dispatch => {
    dispatch({type: UPDATE_PRODUCT, product})
}

export const removeProduct = product => dispatch => {
    dispatch({type: REMOVE_PRODUCT, product})
}

export const clearCart = () => dispatch => {
    dispatch({type: CLEAR})
}

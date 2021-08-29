export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const CLEAR = "CLEAR";

export const sumItems = (cartItems) => {
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => {
        const productPrice = product?.selectedVariation ? product.selectedVariation.price : product.variations[0].price;
        const productSalePrice = product?.selectedVariation ? product.selectedVariation.sale_price : product.variations[0].sale_price;
        const price = productSalePrice ? productSalePrice : productPrice;
        return total + price * product.quantity;
    }, 0).toFixed(2);
    return { itemCount, total }
}

const defaultState = {
    cartItems : []
}

const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            let nextCartItems = [...state.cartItems];
            if(!nextCartItems.find(item => item.id === action.product.id)) {
                nextCartItems.push({
                    ...action.product,
                    quantity: action.product.quantity ? action.product.quantity : 1
                })
            }
            return {
                ...state,
                ...sumItems(nextCartItems),
                cartItems: nextCartItems
            }
        }

        case UPDATE_PRODUCT: {
            const nextCartItems = [...state.cartItems].map(cartItem => {
                if(cartItem.id === action.product.id) {
                    return {...action.product};
                }
                return cartItem;
            })

            return {
                ...state,
                ...sumItems(nextCartItems),
                cartItems: nextCartItems
            };
        }
        case REMOVE_PRODUCT: {
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.id !== action.product.id)),
                cartItems: [...state.cartItems.filter(item => item.id !== action.product.id)]
            }
        }

        case INCREASE: {
            let nextCartItems = state.cartItems.map(product => {
                if(product.id === action.product.id) {
                    product = {
                        ...product,
                        quantity: product.quantity++
                    }
                }
                return product;
            });
            return {
                ...state,
                ...sumItems(nextCartItems),
                cartItems: nextCartItems
            }
        }

        case DECREASE: {
            let nextCartItems = state.cartItems.map(product => {
                if(product.id === action.product.id) {
                    product = {
                        ...product,
                        quantity: product.quantity--
                    }
                }
                return product;
            });
            return {
                ...state,
                ...sumItems(nextCartItems),
                cartItems: nextCartItems
            }
        }

        case CLEAR: {
            return {
                cartItems: [],
                ...sumItems([])
            }
        }

        default:
            return state

    }
}

export default cartReducer;

import {createContext} from 'react';

const DEFAULT_VALUE_CONTEXT = {
    selectedProducts: [],
}

const ShoppingWidgetContext =  createContext({});

export {
    DEFAULT_VALUE_CONTEXT,
    ShoppingWidgetContext
}

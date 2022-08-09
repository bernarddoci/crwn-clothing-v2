import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
  if(existingCartItem) {
    return cartItems
      .map(cartItem => 
        cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}  
        : cartItem
      )
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems
      .map(cartItem => 
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}  
        : cartItem
      )
} 

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(item => item.id !== cartItemToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTIONS_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTIONS_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartCount: payload.cartCount,
        cartTotal: payload.cartTotal,
        cartItems: payload.cartItems
      }
    case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartProvider = ({ children }) => {
  const [{cartItems, cartTotal, cartCount, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, { 
      cartItems: newCartItems, 
      cartCount: newCartCount, 
      cartTotal: newCartTotal 
    }))
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItems)
  }

  const clearItemToCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart, 
    cartItems, 
    cartCount, 
    removeItemToCart,
    clearItemToCart, 
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
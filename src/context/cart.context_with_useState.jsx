import { createContext, useState, useEffect } from "react";

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

const getTotal = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total +cartItem.quantity * cartItem.price, 0);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = getTotal(cartItems);
    setTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemToCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart, 
    cartItems, 
    cartCount, 
    removeItemToCart,
    clearItemToCart, 
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
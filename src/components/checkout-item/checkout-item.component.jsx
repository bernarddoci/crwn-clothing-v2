import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import {
  CheckoutItemContainer,
  ImageCotainer,
  LabelWidth,
  Quantity,
  RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const { addItemToCart, removeItemToCart, clearItemToCart } = useContext(CartContext);
  const { imageUrl, name, price, quantity } = cartItem;

  const clearItemHandler = () => {
    clearItemToCart(cartItem);
  }

  const addItemHandler = () => {
    addItemToCart(cartItem);
  }

  const removeItemHandler = () => {
    removeItemToCart(cartItem);
  }

  return (
    <CheckoutItemContainer>
      <ImageCotainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageCotainer>
      <LabelWidth>{name}</LabelWidth>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </Quantity>
      <LabelWidth>{price}</LabelWidth>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
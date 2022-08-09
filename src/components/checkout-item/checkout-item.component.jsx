import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CheckoutItemContainer,
  ImageCotainer,
  LabelWidth,
  Quantity,
  RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { imageUrl, name, price, quantity } = cartItem;

  const clearItemHandler = () => {
    dispatch(clearItemToCart(cartItems, cartItem));
  }

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  }

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
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
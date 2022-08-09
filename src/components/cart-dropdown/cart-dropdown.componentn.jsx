import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  
  let navigate = useNavigate();

  const gotToCheckotHandler = () => {
    navigate("/checkout");
  }

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {
        cartItems.length
        ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />))
        : (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItemsContainer>
      <Button onClick={gotToCheckotHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
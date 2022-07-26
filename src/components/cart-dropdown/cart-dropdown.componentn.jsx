import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.style.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  let navigate = useNavigate();

  const gotToCheckotHandler = () => {
    navigate("/checkout");
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
      </div>
      <Button onClick={gotToCheckotHandler}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
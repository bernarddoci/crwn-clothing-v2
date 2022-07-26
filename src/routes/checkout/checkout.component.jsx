import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.style.scss';

const labels = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

const Checkout = () => {
  const { setIsCartOpen, cartItems, total } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen])

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {
          labels.map(label => 
            <div key={label} className="head-block">
              <span>{label}</span>
            </div>
          )
        }
      </div>
      {
      cartItems.map(cartItem => <CheckoutItem 
        key={cartItem.id} 
        cartItem={cartItem} 
        />)
      }
      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
    </div>
  )
}

export default Checkout
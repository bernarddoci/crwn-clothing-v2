import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { 
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from './checkout.styles';

const labels = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

const Checkout = () => {
  const { setIsCartOpen, cartItems, total } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen])

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {
          labels.map(label => 
            <HeaderBlock key={label}>
              <span>{label}</span>
            </HeaderBlock>
          )
        }
      </CheckoutHeader>
      {
      cartItems.map(cartItem => <CheckoutItem 
        key={cartItem.id} 
        cartItem={cartItem} 
        />)
      }
      <Total>
        <span>TOTAL: ${total}</span>
      </Total>
    </CheckoutContainer>
  )
}

export default Checkout
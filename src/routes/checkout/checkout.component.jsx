import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

import PaymentForm from "../../components/payment-form/payment-form.component";

const labels = ["Product", "Description", "Quantity", "Price", "Remove"];

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {labels.map((label) => (
          <HeaderBlock key={label}>
            <span>{label}</span>
          </HeaderBlock>
        ))}
      </CheckoutHeader>
      {cartItems.length &&
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
      <Total>
        <span>TOTAL: ${cartTotal}</span>
      </Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;

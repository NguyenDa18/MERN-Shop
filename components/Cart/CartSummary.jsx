import { useState, useEffect } from 'react'
import { Button, Segment, Divider, Header } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import calculateCartTotal from '../../utils/calculateCartTotal'

const CartSummary = ({ products, handleCheckout }) => {
  const [cartAmount, setCartAmount] = useState(0)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [cartEmpty, setCartEmpty] = useState(false)

  useEffect(() => {
    const { cartTotal, paymentTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setPaymentAmount(paymentTotal)
    setCartEmpty(products.length === 0)
  }, [products])


  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total: </strong> {`$${cartAmount}`}
        <StripeCheckout
          name="Cart Checkout"
          amount={cartAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="usd"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button disabled={cartEmpty} icon="cart" color="teal" floated="right" content="Checkout" />
        </StripeCheckout>
      </Segment>

    </>
  );
}

export default CartSummary;

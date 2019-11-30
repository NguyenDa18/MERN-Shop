import { useState, useEffect } from 'react'
import { Button, Segment, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products }) {
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
        <Button disabled={cartEmpty} icon="cart" color="teal" floated="right" content="Checkout" />
      </Segment>

    </>
  );
}

export default CartSummary;

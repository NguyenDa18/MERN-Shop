import React, { useState } from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products)

  const handleRemoveFromCart = async (productId) => {
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const res = await axios.delete(url, payload)
    setCartProducts(res.data)
  }

  const handleCheckout = async (paymentData) => {
    try {
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = { paymentData }
      const headers = { headers: { Authorization: token } }
      const res = await axios.post(url, payload, headers)
    }
    catch (error) {
      console.error(error)
    }

  }

  return (
    <Segment>
      <CartItemList
        user={user}
        products={cartProducts}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary products={cartProducts} handleCheckout={handleCheckout} />
    </Segment>
  );
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token } }
  const response = await axios.get(url, payload)
  return { products: response.data }
}

export default Cart;

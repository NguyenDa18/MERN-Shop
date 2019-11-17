import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'

const AddProductToCart = ({ user }) => {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAddProductToCart = async () => {
    const url = `${baseUrl}/api/cart`
  }

  return (
    <Input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={e => setQuantity(Number(e.target.value))}
    action={user ? {
      color: 'orange',
      content: 'Add to Cart',
      icon: 'plus cart',
      onClick: handleAddProductToCart()
    } : {
      color: 'blue',
      content: 'Sign Up to Purchase',
      icon: 'signup',
      onClick: () => router.push('/signup')
    }}>
    </Input>
  )
}

export default AddProductToCart;

import axios from 'axios'

import AddProductToCart from '../components/Product/AddProductToCart'
import ProductAttributes from '../components/Product/ProductAttributes'
import ProductSummary from '../components/Product/ProductSummary'

import baseUrl from '../utils/baseUrl'

const Product = ({ product }) => (
  <>
    <h1>{product.name}</h1>
    <ProductSummary {...product} />
    <ProductAttributes {...product} />
  </>
)

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  return { product: response.data }


}

export default Product;

import { Card } from 'semantic-ui-react'

const mapProductsToItems = (products) => {
  return products.map(product => ({
    header: product.name,
    image: product.mediaUrl,
    meta: `$${product.price}`,
    color: 'teal',
    fluid: true,
    childKey: product._id,
    href: `/product?_id=${product._id}`
  }))
}

const ProductList = ({ products }) => (
  <Card.Group stackable itemsPerRow="3" centered items={mapProductsToItems(products)} />
)


export default ProductList;

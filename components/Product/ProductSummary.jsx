import { Item, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import AddProductToCart from './AddProductToCart'

const ProductSummary = ({ name, mediaUrl, _id, price, sku, user }) => (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart user={user} productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );

  ProductSummary.propTypes = {
    user: PropTypes.object,
    name: PropTypes.string,
    mediaUrl: PropTypes.string,
    _id: PropTypes.string,
    price: PropTypes.number,
    sku: PropTypes.string
  }

export default ProductSummary;

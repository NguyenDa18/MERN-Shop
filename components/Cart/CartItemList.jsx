import PropTypes from 'prop-types'
import { Header, Message, Segment, Button, Icon, Item } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const CartItemList = ({ user, products, handleRemoveFromCart, success }) => {
  const router = useRouter()

  const mapCartProductsToItems = (products) => {
    return products.map(p => ({
      childKey: p.product._id,
      header: (
        <Item.Header as="a" onClick={() => router.push(`/product?_id=${p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image: (<Item.Image size="small" src={p.product.mediaUrl} />),
      meta: `${p.quantity} x ${p.product.price}`,
      fluid: 'true',
      extra: (
        <Button
          animated
          floated='right'
          color="red"
          onClick={() => handleRemoveFromCart(p.product._id)}
        >
          <Button.Content visible>Remove</Button.Content>
          <Button.Content hidden>
            <Icon name="cancel" />
          </Button.Content>
        </Button>
      )
    }))
  }

  if (success) {
    return (
      <Message 
        success
        header="Success!"
        content="Your order and payment have been accepted"
        icon="star outline"
      />
    )
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No items in your cart ... yet. 😉
        </Header>
        <div>
        {user ? (
            <Button color="orange" onClick={() => router.push('/')}>
              View Products
            </Button>
        ) : (
              <Button color="blue" onClick={() => router.push('/login')}>
                Login to Add Products
              </Button>
          )}
          </div>
      </Segment>
    );
  }
  else {
    return (
      <Item.Group
        unstackable={false}
        divided
        centered="true"
        items={mapCartProductsToItems(products)} />
    )
  }
}

CartItemList.propTypes = {
  user: PropTypes.object,
  products: PropTypes.array.isRequired
}

export default CartItemList;

import { Header, Segment, Button, Icon } from 'semantic-ui-react'
import Link from 'next/link';

function CartItemList() {
  const user = false
  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No items in your cart...yet. <Link href="/"> Add some!</Link>
      </Header>
      {user ? (
        <div>
          <Button color="orange">
            View Products
                    </Button>
        </div>
      ) : (
          <div>
            <Button color="blue">
              Login to Add Products
            </Button>
          </div>
        )}
    </Segment>
  );
}

export default CartItemList;

import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import Axios from 'axios'

function Account({ user, orders }) {
  console.log(orders)
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
    </>
  )
}

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) return { orders: [] }
  const payload = { headers: { Authorization: token }}
  const url = `${baseUrl}/api/orders`
  const response = await Axios.get(url, payload)
  return response.data
}

export default Account;

import App from 'next/app';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies'
import { checkUserRole, redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import Layout from '../components/_App/Layout';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      // no token, not authenticated, redirect
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    }
    else {
      try {
        // provide JWT in header
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user = response.data
        checkUserRole(ctx, user)

        pageProps.user = user

      }
      catch (error) {
        console.error(`Error getting current user: ${error}`)

        // throw out invalid token
        destroyCookie(ctx, 'token')

        // redirect to login
        redirectUser(ctx, '/login')
      }
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;

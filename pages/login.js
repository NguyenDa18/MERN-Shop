import { useState, useEffect } from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  email: '',
  password: ''
}

function Login() {
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isValid = Object.values(user).every(el => Boolean(el))
    isValid ? setDisabled(false) : setDisabled(true)

  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prevState => ({ ...prevState, [name]: value }))

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response)
    }
    catch (error) {
      catchErrors(error, setError)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Message attached icon="privacy" header="Welcome!" content="Log in and do more on the site" color="blue" />
      <Form loading={loading} onSubmit={handleSubmit} error={Boolean(error)}>
        <Message
          error
          header="Oops"
          content={error}
        />
        <Segment>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button icon="sign in" disabled={disabled || loading} type="submit" color="orange" content="Login" />

        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{" "}
        <Link href="/signup"><a>Sign up {" "}</a></Link>{" "} instead.
      </Message>
    </>
  );
}

export default Login;

import { useState, useEffect } from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  name: '',
  email: '',
  password: ''
}

function Signup() {
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

      // make request to sign up user
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
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
      <Message attached icon="settings" header="Sign up" content={`Create a new account`} color="teal" />
      <Form loading={loading} onSubmit={handleSubmit} error={Boolean(error)}>
        <Message
          error
          header="Oops"
          content={error}
        />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
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
          <Button icon="signup" disabled={disabled || loading} type="submit" color="orange" content="Signup" />

        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link href="/login"><a>Log in {" "}</a></Link>{" "} instead.
      </Message>
    </>
  );
}

export default Signup;

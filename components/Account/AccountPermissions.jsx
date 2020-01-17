import React, { useState, useEffect, useRef } from 'react'
import { Header, Checkbox, Table, Icon, Label } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { isAdmin } from '../../utils/auth'
import formatDate from '../../utils/formatDate'
import cookie from 'js-cookie'

const UserPermission = ({ user }) => {
  const [admin, setAdmin] = useState(isAdmin(user))
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    updatePermission()
  }, [admin])


  const handleChangePermission = () => setAdmin(prevState => !prevState)

  const updatePermission = async () => {
    try {
      const url = `${baseUrl}/api/account`
      const payload = { _id: user._id, role: admin ? "admin" : "user" }
      await axios.put(url, payload)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <Table.Row>
        <Table.Cell collapsing>
          <Checkbox checked={admin ? true : false} toggle onChange={handleChangePermission}/>
        </Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
        <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
        <Table.Cell>
          <Label ribbon="right" color={admin ? "green" : "teal"}>
            {admin ? "admin" : "user"}
          </Label>
          </Table.Cell>
    </Table.Row>
  </>
  )
}


function AccountPermissions() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`
    const token = cookie.get('token')
    const payload = { headers: { Authorization: token }}
    const response = await axios.get(url, payload)
    setUsers(response.data)
  }

  return (
    <div style={{ margin: '2em 0'}}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table inverted celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Joined</Table.HeaderCell>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(user => (
              <UserPermission key={user._id} user={user} />
            ))}
          </Table.Body>
      </Table>
    </div>
  );
}

export default AccountPermissions;

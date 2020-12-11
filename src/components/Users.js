import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_USER } from '../queries'

const Users = ({ users }) => {
  const [user, setUser] = useState(null)
  const [getUser, result] = useLazyQuery(FIND_USER)

  const showUser = (name) => {
    getUser({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findUser)
    }
  }, [result.data])

  if (user) {
    return (
      <div>
        <h3>{user.username}</h3>
        <h3>{user.name}</h3>
        <div>{user.address}</div>
        <div>{user.phone}</div>
        <div>{user.isAdmin}</div>
        <button onClick={() => setUser(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map(u =>
        <div key={u.username}>
          {u.username} | {u.name}
          <button onClick={() => showUser(u.name)} >
            show more
          </button>
        </div>
      )}
    </div>
  )
}

export default Users
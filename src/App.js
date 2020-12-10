import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Categories from './components/Categories'
import CategoryForm from './components/CategoryForm'
import LoginForm from './components/LoginForm'
import { ALL_CATEGORIES, CATEGORY_ADDED, ALL_USERS, USER_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const categoriesList = useQuery(ALL_CATEGORIES)
  const usersList = useQuery(ALL_USERS)
  const client = useApolloClient()

  const updateCacheWithCategory = (addedCategory) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_CATEGORIES })
    if (!includedIn(dataInStore.allPersons, addedCategory)) {
      client.writeQuery({
        query: ALL_CATEGORIES,
        data: { allCategories: dataInStore.allCategories.concat(addedCategory) }
      })
    }
  }

  useSubscription(CATEGORY_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedCategory = subscriptionData.data.categoryAdded
      notify(`${addedCategory.name} added`)
      updateCacheWithCategory(addedCategory)
    }
  })


  const updateCacheWithUser = (addedUser) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_USERS })
    if (!includedIn(dataInStore.allUsers, addedUser)) {
      client.writeQuery({
        query: ALL_USERS,
        data: { allUsers: dataInStore.allUsers.concat(addedUser) }
      })
    }
  }

  useSubscription(USER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedUser = subscriptionData.data.userAdded
      notify(`${addedUser.name} added`)
      updateCacheWithUser(addedUser)
    }
  })


  useEffect(() => {
    const token = localStorage.getItem('delivery-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (categoriesList.loading || usersList.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <center>
          <Notify errorMessage={errorMessage} />
          <h2>Login</h2>
          <LoginForm
            setToken={setToken}
            setError={notify}
          />
        </center>
      </div>
    )
  }

  return (
    <div>
      <center>
        <button onClick={logout} >logout</button>
        <Notify errorMessage={errorMessage} />
        <Persons persons={result.data.allPersons} />
        <CategoryForm setError={notify} updateCacheWithCategory={updateCacheWithCategory} />
      </center>
    </div>
  )
}

export default App
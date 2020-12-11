import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_CATEGORY } from '../queries'

const CategoryForm = ({ setError, updateCacheWithCategory }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      updateCacheWithCategory(response.data.addCategory)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    createCategory({
      variables: {
        name, description
      }
    })

    setName('')
    setDescription('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          description <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default CategoryForm
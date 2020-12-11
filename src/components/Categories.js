import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_CATEGORY } from '../queries'

const Categories = ({ persons }) => {
  const [category, setCategory] = useState(null)
  const [getCategory, result] = useLazyQuery(FIND_CATEGORY)

  const showCategory = (name) => {
    getCategory({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setCategory(result.data.findCategory)
    }
  }, [result.data])

  if (category) {
    return (
      <div>
        <h2>{category.name}</h2>
        <div>{category.description}</div>
        <button onClick={() => setCategory(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)} >
            show address
          </button>
        </div>
      )}
    </div>
  )
}

export default Categories
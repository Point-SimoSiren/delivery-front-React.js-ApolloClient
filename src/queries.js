import { gql } from '@apollo/client'


export const ALL_CATEGORIES = gql`
  query {
    allCategories  {
      name
      description
      id
    }
  }
`
export const FIND_CATEGORY = gql`
  query findCategoryByName($nameToSearch: String!) {
    findCategory(name: $nameToSearch) {
      name
      description
      id
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!, $description: String!) {
    addCategory(
      name: $name,
      description: $description
    ) {
      name
      description
      id
    }
  }
`


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CATEGORY_ADDED = gql`
  subscription {
    categoryAdded {
      name
      description
      id
    }
  }
`
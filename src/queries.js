import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query {
    allUsers  {
      username
      name
      address
      phone
      isAdmin
      orders
      id
    }
  }
`

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

export const FIND_USER = gql`
  query findUserByName($nameToSearch: String!) {
    findCategory(name: $nameToSearch) {
      username
      name
      address
      phone
      isAdmin
      orders
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $name: String!, $address: String!, $phone: String!, $isAdmin: Boolean!) {
    addCategory(
      username: $username,
      name: $name,
      address: $address,
      phone: $phone,
      isAdmin: $isAdmin
    ) {
      username
      name
      address
      phone
      isAdmin
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

export const USER_ADDED = gql`
  subscription {
    userAdded {
      username
      name
      address
      phone
      isAdmin
      id
    }
  }
`
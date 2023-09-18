import { gql } from '@apollo/client'

export const GET_ALL_AUTHOR = gql`
query {  allAuthors  { bookCount,born,name}}
`

export const GET_ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    author {
      name
    }
    genres
    id
    published
    title
  }
}
`
export const ADD_NEW_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author {
      born
      id
      name
    }
    genres
    id
    published
    title
  }
}
`

export const EDIT_NUMBER = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    born
    name
  }
}
`

export const ME = gql`
query Query {
  me {
    favoriteGenre
    username
    id
  }
}
`


export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
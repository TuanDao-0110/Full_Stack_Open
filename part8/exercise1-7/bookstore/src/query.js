import { gql } from '@apollo/client'

export const GET_ALL_AUTHOR = gql`
query {  allAuthors  { bookCount,born,name}}
`

export const GET_ALL_BOOKS = gql`
query {
      allBooks {
    author
    genres
    id
    published
    title
  }
}
`
export const ADD_NEW_BOOK = gql`
mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author
    genres
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
import React from 'react'


export default function Recommend({ currentUser, books }) {
  if (currentUser.loading || books.loading) {
    return <div>loading...</div>
  }
  const { username, id, favoriteGenre } = currentUser.data.me
  const listBooks = books.data.allBooks
  const renderBooks = (genre) => {
    return listBooks.map((item, index) => {
      if (item.genres[0] === genre) {
        const { author, published, title, genres } = item
        return <tr>
          <td>{title}</td>
          <td>{author.name}</td>
          <td>{published}</td>
          <td>{genre}</td>
        </tr>
      }
    })
  }
  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Recommendations---{favoriteGenre}
      </h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>
          {renderBooks(favoriteGenre)}
        </tbody>
      </table>
    </div>
  )
}

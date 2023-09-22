import './App.css';
import { useState } from 'react';
import MainLayout from './MainLayout';
import { Route, Routes } from 'react-router-dom';
import Welcome from './component/Welcome';
import Authors from './component/Authors';
import Books from './component/Books';
import AddBook from './component/AddBook';
import LoginForm from './component/LoginForm';
import Recommend from './component/Recommend';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, GET_ALL_BOOKS, ME } from './query';
function App() {
  const [token, setToken] = useState(null)
  const [errMsg, setErrorMsg] = useState(null)
  const [activeGenre, setActiveGenre] = useState('')
  const client = useApolloClient()
  const books = useQuery(GET_ALL_BOOKS, {
    variables: { genre: activeGenre },
    skip: false
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      alert('Book added: ')
      client.cache.updateQuery({ query: GET_ALL_BOOKS, variables: { genre: activeGenre } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(bookAdded),
          }
        }
      )
    }
  })
  // useSubscription()
  // useEffect(() => {
  //   books.refetch({
  //     variables: { genre: activeGenre },
  //     skip: activeGenre
  //   })
  // }, [token, books, activeGenre])

  const currentUser = useQuery(ME)
  return (
    <Routes>
      <Route path='/' element={<MainLayout token={token} setToken={setToken} errMsg={errMsg} setErrorMsg={setErrorMsg} />}>
        <Route index element={<Welcome />} />
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books result={books} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />} />
        <Route path='addbook' element={<AddBook token={token} books={books} />} /> :
        <Route path='login' element={<LoginForm setError={setErrorMsg} setToken={setToken} token={token} />} />
        <Route path='recommend' element={<Recommend currentUser={currentUser} books={books} />} />
      </Route>
    </Routes>
  );
}

export default App;

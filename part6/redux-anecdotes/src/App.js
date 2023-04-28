import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { appendAnecdotes } from './reducers/anecdoteReducer'
import apiService from './services/notes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    apiService.getAll().then((result) => {
      result.forEach(as => dispatch(appendAnecdotes(as)))
    }).catch((err) => {

    });
  }, [dispatch])
  return (
    <div>
      <h2>Filter</h2>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
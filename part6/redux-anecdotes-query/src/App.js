import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAs } from './reducers/anecdoteReducer'
import axios from 'axios'
const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery(
    'notes',
    () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  )
  console.log(result)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAs())
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
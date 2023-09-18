import { useLazyQuery, useApolloClient } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { useEffect, useState } from 'react'
import { ALL_PERSONS } from './query'
import NotifyMsg from './components/NotifyMsg'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg(null)
    }, (2000));
  }
  const [result, { called, loading, data }] = useLazyQuery(ALL_PERSONS, {
    // this will poll every 2s
    // pollInterval: 2000
  })
  useEffect(() => {
    setTimeout(() => {
      if (!called) {
        result()
      }
    }, 1000);
  }, [called,result])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <NotifyMsg msg={errorMsg} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }
  if (!called && !loading) {
    return <div>starting fetching data ...</div>
  }
  if (called && loading) {
    return <div>loading...</div>
  }
  if (!loading && called) {
    if (data) {
      return (
        <div>
          <NotifyMsg msg={errorMsg} />
          <button onClick={logout}>logout</button>
          <Persons persons={data.allPersons} />
          <PersonForm notify={notify} />
          <PhoneForm notify={notify} />
        </div>
      )
    }
    return <div>no data</div>
  }
}

export default App
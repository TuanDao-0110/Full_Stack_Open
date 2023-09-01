import { useLazyQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { useEffect, useState } from 'react'
import { ALL_PERSONS } from './query'
import NotifyMsg from './components/NotifyMsg'
import PhoneForm from './components/PhoneForm'


const App = () => {
  const [errorMsg, setErrorMsg] = useState(null)
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
  }, [])
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
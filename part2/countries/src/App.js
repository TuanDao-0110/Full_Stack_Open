import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './component/Country'
const url = 'https://restcountries.com/v3.1/all'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get(url).then(response => {
      if (response.status === 200) {

        setCountries(response.data)
      }
    }).catch(error => error)
  }, [])

  const render = (arr) => {
    if (arr?.length > 10) {
      return <div>too many matches </div>
    } else if (1 < arr.length < 11) {
      return arr.map((country, index) => {
        return <Country key={index} country={country} />
      })
    } else {
      return <Country country={arr} />
    }
  }


  const filter = (arr) => {
    let temp = arr.filter(i => i.name.common.toLowerCase().includes(search.toLocaleLowerCase()))
    return render(temp)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (

    <div>
      <input type={'text'} onChange={handleSearch} />
      {filter(countries)}
    </div>
  )
}

export default App
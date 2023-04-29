import React, { useState, useEffect } from 'react'
import axios from 'axios'
const url = 'https://restcountries.com/v3.1/name/'
const endpoint = '?fullText=true'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${url}${name}${endpoint}`)
        setCountry({ ...response.data[0], found: true })
      } catch (error) {
        setCountry({ found: false })
      }
    }
    if (name) {
      fetchCountry()
    }
  }, [name])

  return country
}


const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }
  if (!country?.found) {
    return (
      <div>
        not found...
      </div>
    )
  } else {
    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital[0]} </div>
        <div>population {country.population}</div>
        <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
      </div>
    )
  }
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.replace(/\s/g, ''))
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
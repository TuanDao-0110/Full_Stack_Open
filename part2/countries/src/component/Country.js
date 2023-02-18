import React, { useState } from 'react'
import Weather from './Weather'

const Country = (props) => {
  const { name, capital, languages, area, flags } = props.country
  const [showData, setShowData] = useState(false)
  const renderLanguage = (objectLang) => {
    return Object.values(objectLang).map((item, index) => {
      return <li key={index}>
        {item}
      </li>
    })
  }
  return (
    <div style={{
      margin: '10px 0'
    }}>
      <h2>

        {name.common}
      </h2>
      <button onClick={() => { setShowData(!showData) }}>show data</button>
      {
        showData ?
          <>
            <p> capital : {capital[0]}</p>
            <p>area : {area}</p>
            <h3>Languages</h3>
            {
              renderLanguage(languages)
            }
            <img src={flags.png} alt='flag' width={150} height={100} />
            <Weather name={name.common}  />
          </>

          : ''
      }
    </div>
  )
}

export default Country
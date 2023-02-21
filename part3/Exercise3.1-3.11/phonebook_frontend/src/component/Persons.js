import React from 'react'

function Persons({ renderPersons ,persons,filterName}) {
    const renderFilter = (arr, nameFilter) => {
        let newArrRender = arr.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        return renderPersons(newArrRender)
    }
  return (
    <div>
          {renderFilter(persons, filterName)}

    </div>
  )
}

export default Persons
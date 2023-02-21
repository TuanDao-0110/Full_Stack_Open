import React from 'react'

const Filter = ({ handleNewFilter, filterName }) => {

    return (
        <div>
            filer shown with : <input type={'text'} value={filterName} onChange={handleNewFilter} />

        </div>
    )
}

export default Filter
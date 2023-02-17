import React from 'react'

const Part = ({ name, exercises, id }) => {
    return (
        <div key={id}>

            {name} {exercises}
        </div>
    )
}

export default Part
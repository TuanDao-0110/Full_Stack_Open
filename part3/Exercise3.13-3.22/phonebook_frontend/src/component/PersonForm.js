import React from 'react'

function PersonForm({ handleSubmit ,newName,number,handleNewNumber,hanldeNewNote}) {
   
  return (
      <form onSubmit={handleSubmit}>
          <h2>Add new</h2>
          <div>
              name: <input type={'text'} value={newName} onChange={hanldeNewNote} />
          </div>
          <div>
              number: <input type={'text'} value={number} onChange={handleNewNumber} />
          </div>
          <div>
              <button type="submit" >add</button>
            
          </div>
      </form>
  )
}

export default PersonForm
import React from 'react';

  const PersonForm = ({submit, newName, handleNameChange, newNumber, handleNumberChange}) => {
      return (
        <>
        <h2>Add a new</h2>
        <form>
          <div>
            name: <input onChange={handleNameChange} value={newName} />
          </div>
          <div>
            number: <input onChange={handleNumberChange} value={newNumber} />
          </div>
          <div>
            <button type="submit" onClick={(event) => submit(event, newNumber)}>add</button>
          </div>
        </form>
        </>
      )

  }

export default PersonForm
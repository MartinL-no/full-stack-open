import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorEditForm = ({ allAuthors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR,
    {refetchQueries: [ { query: ALL_AUTHORS } ]}
  )
  const options = allAuthors.map((a) => ({ value: a.name, label: a.name }))


  const onSubmit = async (event) => {
    event.preventDefault()
    
    await editAuthor({ variables: { name: selectedOption.value, setBornTo: parseInt(born) } })
    
    setBorn('')
  }
  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <Select 
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
          <div>
            born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">
            update author
          </button>
      </form>
    </>
  )
}

export default AuthorEditForm
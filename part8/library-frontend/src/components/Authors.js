import { useState } from "react"
import Select from 'react-select'
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR,
    {refetchQueries: [ { query: ALL_AUTHORS } ]}
  )

  if (!props.show || result.loading) {
    return null
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    
    await editAuthor({ variables: { name: selectedOption.value, setBornTo: parseInt(born) } })
    
    setBorn('')
  }

  const options = result.data.allAuthors.map((a) => ({ value: a.name, label: a.name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  )
}

export default Authors

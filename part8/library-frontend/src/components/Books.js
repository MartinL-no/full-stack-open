import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GENRE_BOOKS } from "../queries"
import GenreButtons from "./GenreButtons"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(GENRE_BOOKS)

  useEffect(() => {
    const updateBooks = async () => {
      result.refetch({ genre: selectedGenre })
    }
    updateBooks()
  }, [selectedGenre, result])
  
  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <p>in genre <strong>{selectedGenre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreButtons 
        setSelectedGenre={setSelectedGenre}
        show={props.show}
        />
    </div>
  )
}

export default Books

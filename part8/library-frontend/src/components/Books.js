import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show || result.loading) {
    return null
  }

  const genres = result.data.allBooks.reduce((acc, { genres }) => {
      return acc.concat(genres)
  }, [])
  const genresWithNoDuplicates = Array.from(new Set(genres))
  const books = selectedGenre === null
    ? result.data.allBooks
    : result.data.allBooks.filter(book => (
        book.genres.includes(selectedGenre)
      ))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresWithNoDuplicates.map(genre => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
        >{genre}</button>
      ))}
    </div>
  )
}

export default Books

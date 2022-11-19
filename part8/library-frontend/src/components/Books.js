import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show || result.loading) {
    return null
  }

  const allBooks = result.data.allBooks
  const genres = allBooks.reduce((acc, { genres }) => acc.concat(genres), [])
  const genresWithNoDuplicates = Array.from(new Set(genres))
  const books = selectedGenre === null
    ? allBooks
    : allBooks.filter(book => (
        book.genres.includes(selectedGenre)
      ))

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
      <button
          onClick={() => setSelectedGenre(null)}
        >all</button>
    </div>
  )
}

export default Books

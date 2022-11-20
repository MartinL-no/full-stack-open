import { useQuery } from "@apollo/client"
import { GENRE_BOOKS, ME } from "../queries"

const Recommendations = ({ show, token }) => {
  const me = useQuery(ME, {
    skip: token === null
  })
  const books = useQuery(GENRE_BOOKS, {
    variables: { genre: me.data?.me.favoriteGenre },
    skip: token === null
  })

  if (!show || !token ) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{me.data?.me.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
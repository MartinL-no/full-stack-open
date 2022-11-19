import { useQuery } from "@apollo/client"
import { ME, GENRE_BOOKS } from "../queries"

const Recommendations = (props) => {
  const user = useQuery(ME)
  const booksByGenre = useQuery(GENRE_BOOKS, {
    variables: { genre: user.data.me.favoriteGenre  },
    skip: !user.data.me.favoriteGenre,
  })
  
  if (!props.show || user.loading) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{user.data.me.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.data.allBooks.map((a) => (
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
import { useQuery } from "@apollo/client"
import { ALL_GENRES } from "../queries"

const GenreButtons = ({ setSelectedGenre, show }) => {
  const result = useQuery(ALL_GENRES)
  
  if (!show || result.loading) {
    return null
  }

  return (
    <div>
      {result.data.allGenres.map(genre => (
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

export default GenreButtons
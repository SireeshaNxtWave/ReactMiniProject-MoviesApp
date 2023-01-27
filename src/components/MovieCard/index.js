import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {details} = props
  const {id, posterPath, title} = details

  return (
    <Link to={`/movies/${id}`} key={id}>
      <li className="list-item" key={id}>
        <img alt={title} className="popular-movie-poster" src={posterPath} />
      </li>
    </Link>
  )
}

export default MovieCard

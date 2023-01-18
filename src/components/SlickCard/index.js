import {Link} from 'react-router-dom'
import './index.css'

const SlickCard = props => {
  const {details} = props
  const {posterPath, title, id} = details

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img alt={title} className="poster-img" src={posterPath} />
      </li>
    </Link>
  )
}
export default SlickCard

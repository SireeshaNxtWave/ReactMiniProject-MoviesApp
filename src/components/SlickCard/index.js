import {Link} from 'react-router-dom'
import './index.css'

const SlickCard = props => {
  const {details} = props
  const {posterPath, title, id} = details

  return (
    <Link to={`/movies/${id}`}>
      <img alt={title} className="poster-img" src={posterPath} />
    </Link>
  )
}
export default SlickCard

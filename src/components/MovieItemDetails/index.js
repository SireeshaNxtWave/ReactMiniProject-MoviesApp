import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import MovieCard from '../MovieCard'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    movieDetails: [],
    similarMovies: [],
    genres: [],
    spokenLanguages: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        id: data.movie_details.id,
        backdropPath: data.movie_details.backdrop_path,
        adult: data.movie_details.adult,
        budget: data.movie_details.budget,
        title: data.movie_details.title,
        overview: data.movie_details.overview,
        originalLanguage: data.movie_details.original_language,
        releaseDate: data.movie_details.release_date,
        count: data.movie_details.vote_count,
        rating: data.movie_details.vote_average,
        runtime: data.movie_details.runtime,
        posterPath: data.movie_details.poster_path,
      }
      // console.log(updatedData)
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      // console.log(genresData)
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      console.log(updatedSimilarData)
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        similarMovies: updatedSimilarData,
        spokenLanguages: updatedLanguagesData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {
      releaseDate,
      title,
      adult,
      count,
      rating,
      budget,
      backdropPath,
      runtime,
      overview,
    } = movieDetails
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const date = new Date(releaseDate)
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const convertedDate = `${day}${dateEndingWord}${monthName}${year}`

    return (
      <div className="root-container">
        <div
          className="backdrop-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'Cover',
          }}
        >
          <h1 className="movie-details-text">{title}</h1>
          <div className="time-container">
            <p className="movie-details-text">{`${hours}h ${minutes}m`}</p>
            <p className="movie-details-text">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-details-text">{year}</p>
          </div>

          <p className="movie-details-text">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
        <div className="movie-info-container">
          <ul className="genres-list">
            <h1 className="genres-heading">Genres</h1>
            {genres.map(eachGenre => (
              <p key={eachGenre.id} className="list-item">
                {eachGenre.name}
              </p>
            ))}
          </ul>
          <ul className="genres-list">
            <h1 className="genres-heading">Audio Available</h1>
            {spokenLanguages.map(eachAudio => (
              <p key={eachAudio.id} className="list-item">
                {eachAudio.language}
              </p>
            ))}
          </ul>
          <div>
            <h1 className="genres-heading">Rating Count</h1>
            <p className="list-item">{count}</p>
            <h1 className="genres-heading">Rating Average</h1>
            <p className="list-item">{rating}</p>
          </div>
          <div>
            <h1 className="genres-heading">Budget</h1>
            <p className="list-item">{budget}</p>
            <h1 className="genres-heading">Release Date</h1>
            <p className="list-item">{convertedDate}</p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="heading">More like this</h1>
          {similarMovies.map(each => (
            <MovieCard key={each.id} details={each} />
          ))}
        </div>
      </div>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        {this.renderMovieDetails()}
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails

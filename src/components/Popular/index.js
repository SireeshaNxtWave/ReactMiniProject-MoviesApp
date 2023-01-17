import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Popular extends Component {
  state = {
    popularMovieList: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiURl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        overview: each.overview,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        popularMovieList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovieList} = this.state
    return (
      <ul>
        {popularMovieList.map(each => (
          <MovieCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-main-container">
        <Header />
        <div>{this.renderPopularMovies()}</div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular

import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getHomePoster()
  }

  getHomePoster = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      // console.log(randomPoster)
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      // console.log(updatedData)
      this.setState({
        initialPoster: {...updatedData},
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {initialPoster} = this.state
    const {overview, title, backdropPath} = initialPoster
    return (
      <div
        className="home-poster-card"
        style={{backgroundImage: `url(${backdropPath})`}}
      >
        <h1 className="poster-title">{title}</h1>
        <p className="poster-overview">{overview}</p>
        <button type="button" className="poster-play-btn">
          Play
        </button>
      </div>
    )
  }

  renderHomePoster = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {initialPoster} = this.state
    console.log(initialPoster)
    return (
      <div className="home-bg-container">
        <Header />
        {this.renderHomePoster()}
        <div className="movies-list-container">
          <div>
            <h1 className="heading">Trending Now</h1>
            <TrendingNow />
          </div>
          <div>
            <h1 className="heading">Originals</h1>
            <Originals />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home

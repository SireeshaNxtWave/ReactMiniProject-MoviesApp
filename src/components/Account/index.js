import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MoviesAppContext from '../../context/MoviesAppContext'
import './index.css'

const Account = props => (
  <MoviesAppContext.Consumer>
    {value => {
      const {userName, password} = value
      console.log(userName, password)

      const stars = '*'.repeat(password.length)

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      return (
        <>
          <Header />
          <div className="account-container">
            <h2 className="account-heading">Account</h2>
            <hr className="hr-line" />
            <p className="description">
              Member ship{' '}
              <span className="span-element">{userName}@gmail.com</span>
            </p>
            <p className="description">
              Password : <span>{stars}</span>
            </p>
            <hr className="hr-line" />
            <p className="description">
              Plan Details{' '}
              <span className="span-element">
                <p>Premium </p>
                <span className="ultra-hd">
                  <p>Ultra HD</p>
                </span>
              </span>
            </p>
            <hr className="hr-line" />
            <div className="button-container">
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <Footer />
        </>
      )
    }}
  </MoviesAppContext.Consumer>
)

export default Account

import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  // console.log(username, password)
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
          Member ship <span className="span-element">{username}@gmail.com</span>
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
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Account

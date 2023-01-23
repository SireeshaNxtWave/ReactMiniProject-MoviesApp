import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import MoviesAppContext from '../../context/MoviesAppContext'
import './index.css'

class Login extends Component {
  state = {showSubmitError: false, errorMsg: ''}

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <MoviesAppContext.Consumer>
        {value => {
          const {userName, password, onChangeUserName, onChangePassword} = value
          const onChangeName = event => {
            const values = event.target.value
            onChangeUserName(values)
          }

          const onChangePass = event => {
            const values = event.target.value
            onChangePassword(values)
          }

          const onSubmitSuccess = token => {
            const {history} = this.props
            Cookies.set('jwt_token', token, {expires: 30})
            history.replace('/')
          }

          const onSubmitFailure = msg => {
            this.setState({showSubmitError: true, errorMsg: msg})
          }

          const submitForm = async event => {
            event.preventDefault()
            const userDetails = {
              username: userName,
              password,
            }
            const apiUrl = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if (response.ok === true) {
              onSubmitSuccess(data.jwt_token)
            } else {
              onSubmitFailure(data.error_msg)
            }
          }

          return (
            <div className="login-bg-container">
              <img
                alt="login website logo"
                src="https://res.cloudinary.com/dbs4ptlww/image/upload/v1672745646/Group_7399movies_dni27b.png"
                className="website-logo"
              />
              <div className="login-form">
                <form className="form-container" onSubmit={submitForm}>
                  <h1 className="login-heading">Login</h1>
                  <label htmlFor="username" className="label-name">
                    USERNAME
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="input-element"
                    value={userName}
                    onChange={onChangeName}
                  />
                  <label htmlFor="password" className="label-name">
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input-element"
                    value={password}
                    onChange={onChangePass}
                  />
                  {showSubmitError && <p className="error-msg">{errorMsg}</p>}
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </MoviesAppContext.Consumer>
    )
  }
}
export default Login

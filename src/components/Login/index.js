import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {userName, password} = this.state
    localStorage.setItem('userName', userName)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
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
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          alt="login website logo"
          src="https://res.cloudinary.com/dbs4ptlww/image/upload/v1672745646/Group_7399movies_dni27b.png"
          className="website-logo"
        />
        <div className="login-form">
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="login-heading">Login</h1>
            <label htmlFor="username" className="label-name">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input-element"
              value={userName}
              onChange={this.onChangeUserName}
            />
            <label htmlFor="password" className="label-name">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input-element"
              value={password}
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login

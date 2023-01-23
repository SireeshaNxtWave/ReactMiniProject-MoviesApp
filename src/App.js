import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Search from './components/Search'
import Account from './components/Account'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'

import MoviesAppContext from './context/MoviesAppContext'

import './App.css'
// import FailureView from './components/FailureView'

class App extends Component {
  state = {
    userName: '',
    password: '',
  }

  onChangeName = username => {
    this.setState({userName: username})
  }

  onChangePassword = password => {
    this.setState({password})
  }

  render() {
    const {userName, password} = this.state
    return (
      <MoviesAppContext.Provider
        value={{
          userName,
          password,
          onChangeUserName: this.onChangeName,
          onChangePassword: this.onChangePassword,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/popular" component={Popular} />
          <ProtectedRoute path="/movies/:id" component={MovieItemDetails} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </MoviesAppContext.Provider>
    )
  }
}

export default App

import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Search from './components/Search'
import Account from './components/Account'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'

import './App.css'
// import FailureView from './components/FailureView'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/popular" component={Popular} />
    <ProtectedRoute path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute path="/account" component={Account} />
    <ProtectedRoute path="/search" component={Search} />
    <Route component={NotFound} />
  </Switch>
)

export default App

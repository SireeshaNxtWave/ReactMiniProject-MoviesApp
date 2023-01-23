import React from 'react'

const MoviesAppContext = React.createContext({
  userName: '',
  password: '',
  onChangeUserName: () => {},
  onChangePassword: () => {},
})

export default MoviesAppContext

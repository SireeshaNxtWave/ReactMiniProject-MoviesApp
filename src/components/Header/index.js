import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickSearchButton = () => {
    this.setState(prevState => ({showSearchBar: !prevState.showSearchBar}))
  }

  onClickMenuIcon = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    const {showMenu, showSearchBar} = this.state

    return (
      <nav>
        <div className="header-card">
          <div className="logo-part">
            <Link to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/dbs4ptlww/image/upload/v1672745646/Group_7399movies_dni27b.png"
              />
            </Link>
            <ul className="list-container">
              <Link to="/" className="link-item">
                <li className="list-item">Home</li>
              </Link>
              <Link to="/popular" className="link-item">
                <li className="list-item">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="profile-part">
            {showSearchBar && (
              <input
                type="search"
                className="search-input"
                onKeyDown={this.onChangeSearchInput}
              />
            )}
            <Link to="/search">
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchButton}
              >
                <HiOutlineSearch size={25} />
              </button>
            </Link>
            <Link to="/account">
              <img
                className="profile-img"
                alt="profile"
                src="https://res.cloudinary.com/dbs4ptlww/image/upload/v1673628398/Avatar_ynumyu.png"
              />
            </Link>
            <button type="button" className="menu-btn">
              <MdMenuOpen
                size={35}
                className="menu-icon"
                onClick={this.onClickMenuIcon}
              />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="mini-list">
            <ul className="list-container">
              <Link to="/" className="link-item">
                <li className="list-item">Home</li>
              </Link>
              <Link to="/popular" className="link-item">
                <li className="list-item">Popular</li>
              </Link>
              <Link to="/account" className="link-item">
                <li className="list-item">Account</li>
              </Link>
            </ul>
            <ImCross size={10} color="#ffffff" onClick={this.onClickHideMenu} />
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)

import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import NavigationMenu from '../NavigationMenu'
import appContext from '../../context/appContext'
import './index.css'

const HeaderTextArray = [
  {
    id: 1,
    text: 'Home',
    linkPath: '/',
  },
  {
    id: 2,
    text: 'BookShelves',
    linkPath: '/shelf',
  },
]

class Header extends Component {
  onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderDesktopHeader = () => (
    <appContext.Consumer>
      {value => {
        const {onClickChangeOption, activeNavOption} = value

        console.log(activeNavOption)

        return (
          <div className="desktop-header">
            <Link to="/" style={{textDecoration: 'none'}}>
              <img
                // onClick={onClickLogo}
                alt="website logo"
                className="logo"
                src="https://res.cloudinary.com/dwwzfhucu/image/upload/v1675668932/Logo_y8heux.jpg"
              />
            </Link>
            <ul className="nav-options-list">
              {HeaderTextArray.map(eachOption => (
                <NavigationMenu
                  key={eachOption.id}
                  navigationItems={eachOption}
                  onClickChangeOption={onClickChangeOption}
                  isActive={eachOption.id === activeNavOption}
                />
              ))}

              <Link to="/login" style={{textDecoration: 'none'}}>
                <li>
                  <button
                    onClick={this.onClickLogoutBtn}
                    type="button"
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        )
      }}
    </appContext.Consumer>
  )

  renderMobileNavToggleBar = () => (
    <appContext.Consumer>
      {value => {
        const {onClickChangeOption, activeNavOption, onClose} = value

        return (
          <div className="mobile-header-nav-con">
            <ul className="list-of-mobile-head-options">
              {HeaderTextArray.map(eachOption => (
                <NavigationMenu
                  key={eachOption.id}
                  navigationItems={eachOption}
                  onClickChangeOption={onClickChangeOption}
                  isActive={eachOption.id === activeNavOption}
                />
              ))}

              <Link to="/login" style={{textDecoration: 'none'}}>
                <li>
                  <button
                    onClick={this.onClickLogoutBtn}
                    type="button"
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </Link>
              <button type="button" className="close-btn" onClick={onClose}>
                <AiFillCloseCircle size={30} color="black" />
              </button>
            </ul>
          </div>
        )
      }}
    </appContext.Consumer>
  )

  renderMobileHeader = () => (
    <appContext.Consumer>
      {value => {
        const {onToggleIcon, showNavIcons} = value

        return (
          <div className="mobile-header">
            <div className="mobile-head-logo-con">
              <Link to="/" style={{textDecoration: 'none'}}>
                <img
                  // onClick={onClickLogo}
                  alt="website logo"
                  className="logo"
                  src="https://res.cloudinary.com/dwwzfhucu/image/upload/v1675668932/Logo_y8heux.jpg"
                />
              </Link>

              <button type="button" className="nav-btn" onClick={onToggleIcon}>
                <GiHamburgerMenu size={25} color="black" />
              </button>
            </div>

            {showNavIcons && this.renderMobileNavToggleBar()}
          </div>
        )
      }}
    </appContext.Consumer>
  )

  render() {
    return (
      <appContext.Consumer>
        {value => {
          const {dummy} = value

          /* const onClickLogo = () => {
            onClickChangeOption(HeaderTextArray[0].id)
          } */

          return (
            <div className="nav-con">
              {this.renderDesktopHeader()}

              {this.renderMobileHeader()}
            </div>
          )
        }}
      </appContext.Consumer>
    )
  }
}

export default withRouter(Header)

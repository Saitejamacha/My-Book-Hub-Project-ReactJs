import {Link} from 'react-router-dom'
import appContext from '../../context/appContext'
import './index.css'

const NavigationMenu = props => {
  const {navigationItems, onClickChangeOption, isActive} = props
  const {id, text, linkPath} = navigationItems

  const onClickOptions = () => {
    onClickChangeOption(id)
  }
  const textColor = isActive ? 'nav-text-style' : 'nav-no-color'
  console.log(textColor)

  return (
    <appContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <li className={textColor} onClick={onClickOptions}>
            <Link
              className={textColor}
              to={`${linkPath}`}
              style={{textDecoration: 'none'}}
            >
              {text}
            </Link>
          </li>
        )
      }}
    </appContext.Consumer>
  )
}

export default NavigationMenu

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'
import appContext from '../../context/appContext'

const Footer = () => (
  <appContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const footerDarkText = isDarkTheme ? 'footer-dark-text' : ''

      return (
        <div className="footer-con">
          <div className="all-icons">
            <button type="button" className="icon-btn">
              <FaGoogle className={`icon ${footerDarkText}`} />
            </button>
            <button type="button" className="icon-btn">
              <FaTwitter className={`icon ${footerDarkText}`} />
            </button>
            <button type="button" className="icon-btn">
              <FaInstagram className={`icon ${footerDarkText}`} />
            </button>
            <button type="button" className="icon-btn">
              <FaYoutube className={`icon ${footerDarkText}`} />
            </button>
          </div>
          <p className={`contact-us-text ${footerDarkText}`}>Contact us</p>
        </div>
      )
    }}
  </appContext.Consumer>
)

export default Footer
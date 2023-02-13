import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitErrorMesg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    // console.log(history)

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    // console.log(errorMsg)
    this.setState({showSubmitErrorMesg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // console.log(response)
    // console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  // const history = this.props
  // console.log(history)

  render() {
    const {showSubmitErrorMesg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-con">
        <img
          alt="book-pages"
          className="login-img"
          src="https://res.cloudinary.com/dwwzfhucu/image/upload/v1675703832/decsk_2_Rectangle_1467_qmh89v.jpg"
        />
        <div className="credentials-con">
          <form onSubmit={this.onSubmitForm} className="input-con">
            <img
              //   className="website-logo"
              alt="logo"
              src="https://res.cloudinary.com/dwwzfhucu/image/upload/v1675668932/Logo_y8heux.jpg"
            />
            <label htmlFor="username">username*</label>
            <input onChange={this.onChangeUsername} id="username" type="text" />
            <label htmlFor="password">password*</label>
            <input
              onChange={this.onChangePassword}
              id="password"
              type="password"
            />
            {showSubmitErrorMesg && <p className="error-mesg">{errorMsg}</p>}
            <button type="submit" className="login-Btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

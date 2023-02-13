import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import BooksSlider from '../BooksSlider'
import appContext from '../../context/appContext'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getbooks()
  }

  getbooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    // console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)

      const updatedData = fetchedData.books.map(eachBook =>
        this.getUpdatedData(eachBook),
      )

      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getUpdatedData = eachBook => ({
    authorName: eachBook.author_name,
    coverPic: eachBook.cover_pic,
    id: eachBook.id,
    title: eachBook.title,
  })

  renderLoadingView = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0284C7" height={120} width={120} />
    </div>
  )

  renderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <>
        <div className="slick-outer-con">
          <div className="slider-options-con">
            <p className="slider-title">Top Rated Books</p>
            <Link to="/shelf">
              <button className="finds-books-btn">Find Books</button>
            </Link>
          </div>

          <div className="books-slider">
            <BooksSlider booksList={topRatedBooks} />
          </div>
        </div>
      </>
    )
  }

  onClickTryAgainBtn = () => {
    this.getBooks()
  }

  renderFailureView = () => (
    <appContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkThemeDescription = isDarkTheme
          ? 'bookshelves-dark-description-text'
          : ''

        return (
          <div className="failure-view">
            <img
              className="book-shelves-failure-view-image"
              src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662554492/SomethingWentWrong_qek4y3.png"
              alt="failure view"
            />
            <p
              className={`book-shelves-failure-view-description ${darkThemeDescription}`}
            >
              Something went wrong, Please try again.
            </p>
            <button
              type="button"
              className="try-btn"
              onClick={this.onClickTryAgainBtn}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </appContext.Consumer>
  )

  renderBookShelvesContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="outer-con">
          <div className="home-con">
            <h1 className="Home-header">Find Your Next Favorite Books?</h1>
            <p className="Home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            {this.renderBookShelvesContainer()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'
import appContext from '../../context/appContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookDetails: {},
  }

  componentDidMount() {
    this.getbook()
  }

  getbook = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getUpdatedData(fetchedData.book_details)

      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getUpdatedData = data => ({
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
  })

  renderLoadingView = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0284C7" height={120} width={120} />
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      id,
      title,
      readStatus,
    } = bookDetails

    return (
      <appContext.Consumer>
        {value => {
          const {isDarkTheme, removeFavorites} = value
          const darkThemeColor = isDarkTheme ? '#d3d3d3' : '#475569'

          const bookItemsDetailsBg = isDarkTheme
            ? 'book-item-details-dark-bg'
            : ''
          const darkThemeHeading = isDarkTheme
            ? 'book-item-details-dark-heading-text'
            : ''
          const darkDescription = isDarkTheme
            ? 'book-item-details-dark-description-text'
            : ''

          return (
            <div className={`book-details-outer-con ${bookItemsDetailsBg}`}>
              <div className="book-details-inner-con">
                <img className="book-details-img" src={coverPic} alt={title} />
                <div className="info-container">
                  <h1 className={`book-title ${darkThemeHeading}`}>{title}</h1>
                  <p className={`book-details-author-name ${darkDescription}`}>
                    {authorName}
                  </p>
                  <div className="rating-con">
                    <p className={`rating-text ${darkDescription}`}>
                      Avg Rating
                    </p>
                    <BsFillStarFill color="#FBBF24" size={18} />
                    <p className={`book-details-rating ${darkDescription}`}>
                      {rating}
                    </p>
                  </div>
                  <p className={`book-details-status-text ${darkDescription}`}>
                    Status:
                    <span className="book-details-status"> {readStatus}</span>
                  </p>
                </div>
              </div>
              <hr className="h-line" />
              <h1 className={`about-heading ${darkThemeHeading}`}>
                About Author
              </h1>
              <p className={`about-des ${darkDescription}`}>{aboutAuthor}</p>
              <h1 className={`about-book ${darkThemeHeading}`}>About Book</h1>
              <p className={`about-des ${darkDescription}`}>{aboutBook}</p>
            </div>
          )
        }}
      </appContext.Consumer>
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
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="book-details-con">
          {this.renderBookShelvesContainer()}
          {apiStatus === apiStatusConstants.success ? <Footer /> : null}
        </div>
      </>
    )
  }
}

export default BookDetails
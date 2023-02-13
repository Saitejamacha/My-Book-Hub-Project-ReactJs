import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BookCard from '../BookCard'
import ShelfCategory from '../ShelfCategory'
import appContext from '../../context/appContext'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    activeOptionId: '',
    searchText: '',
    apiStatus: apiStatusConstants.initial,
    sheftName: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeOptionId, searchText} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeOptionId}&search=${searchText}`

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
      const updatedData = fetchedData.books.map(eachBook =>
        this.getUpdatedBooksData(eachBook),
      )

      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getUpdatedBooksData = eachBook => ({
    authorName: eachBook.author_name,
    coverPic: eachBook.cover_pic,
    id: eachBook.id,
    title: eachBook.title,
    readStatus: eachBook.read_status,
    rating: eachBook.rating,
  })

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickShelfChange = (activeShelf, labelName) => {
    this.setState(
      {activeOptionId: activeShelf, sheftName: labelName},
      this.getBooks,
    )
  }

  onSubmitSearch = event => {
    event.preventDefault()

    this.getBooks()
  }

  renderNoBooksForInput = () => {
    const {searchText} = this.state

    return (
      <appContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeDescription = isDarkTheme
            ? 'bookshelves-dark-description-text'
            : ''

          return (
            <div className="empty-books-page">
              <img
                className="no-books-view-image"
                src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662554096/SearchNotFound_dfk3mn.png"
                alt="no books"
              />
              <p
                className={`no-books-view-description ${darkThemeDescription}`}
              >
                Your search for {searchText} did not find any matches.
              </p>
            </div>
          )
        }}
      </appContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0284C7" height={120} width={120} />
    </div>
  )

  renderSuccessView = () => {
    const {booksList} = this.state
    const booksArrayLength = booksList.length

    return (
      <>
        {booksArrayLength !== 0 ? (
          <div className="books-con">
            {booksList.map(eachBook => (
              <BookCard key={eachBook.id} bookCard={eachBook} />
            ))}
          </div>
        ) : (
          this.renderNoBooksForInput()
        )}
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
    const {sheftName} = this.state
    // console.log(sheftName)
    return (
      <>
        <Header />
        <div className="book-shelf-con">
          <div className="shelf-options-con">
            <h1 className="shelf-head">Book Shelf</h1>
            <ul className="shelf-con">
              {bookshelvesList.map(eachshelf => (
                <ShelfCategory
                  key={eachshelf.id}
                  selfDetails={eachshelf}
                  onClickShelfChange={this.onClickShelfChange}
                  isActive={eachshelf.label === sheftName}
                />
              ))}
            </ul>
          </div>

          <div className="books-and-search-con">
            <div className="search-con">
              <h1 className="shelf-header-name">{sheftName} Books</h1>
              <form
                onSubmit={this.onSubmitSearch}
                className="searchInput-icon-con"
              >
                <input
                  className="search-input-box"
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                  type="search"
                />
                <button type="submit" className="icon-con">
                  <BsSearch className="search-icon" />
                </button>
              </form>
            </div>
            {this.renderBookShelvesContainer()}
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves

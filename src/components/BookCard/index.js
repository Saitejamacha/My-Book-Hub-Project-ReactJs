import {Link} from 'react-router-dom'
import './index.css'

const BookCard = props => {
  const {bookCard} = props
  const {authorName, coverPic, id, title, readStatus, rating} = bookCard

  return (
    <Link to={`/books/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-book-con-list">
        <img alt="book-cover-pic" className="book-cover-pic" src={coverPic} />
        <div className="book-details">
          <p>{title}</p>
          <p>{authorName}</p>
          <p>Avg Rating {rating}</p>
          <p>{readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default BookCard

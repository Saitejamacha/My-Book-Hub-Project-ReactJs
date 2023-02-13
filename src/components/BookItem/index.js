import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {authorName, coverPic, id, title} = bookDetails

  return (
    <Link to={`/books/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-book-list">
        <img alt="book-cover" className="cover-pic" src={coverPic} />
        <p className="book-title">{title}</p>
        <p className="author-name">{authorName}</p>
      </li>
    </Link>
  )
}

export default BookItem

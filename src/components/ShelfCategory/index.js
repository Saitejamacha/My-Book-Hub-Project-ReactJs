import './index.css'

const ShelfCategory = props => {
  const {selfDetails, isActive, onClickShelfChange} = props
  const {label, value} = selfDetails

  const onClickshelfBtn = () => {
    onClickShelfChange(value, label)
  }

  const textColor = isActive ? 'text-style' : 'no-color'

  return (
    <li>
      <button
        className={`shelf-name-btn ${textColor}`}
        type="button"
        onClick={onClickshelfBtn}
      >
        {label}
      </button>
    </li>
  )
}

export default ShelfCategory

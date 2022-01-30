import './Button.scss'
import { Link } from 'react-router-dom'

const Button = ({elt, text, size, action, link, ico}) => (
  <button className={`btn ${elt}__btn ${size}`} onClick={action}>
    <Link to={link} className='btn__link'>{text}</Link>
    <i className={`btn__icon ${ico}`}></i>
  </button>
)

export default Button

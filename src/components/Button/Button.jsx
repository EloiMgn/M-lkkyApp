import './Button.scss'
import { Link } from 'react-router-dom'

const Button = ({elt, text, size, action, link, ico}) => {
if(link){
  return (
    <Link to={link} className={`btn ${elt}__btn ${size}`} onClick={action}>
      <div className='btn__link'>{text}</div>
      <i className={ico ? `btn__icon ${ico}` : 'hidden'}></i>
    </Link>
  )
}   
return (
  <button className={`btn ${elt}__btn ${size}`} onClick={action}>
    <p className='btn__link'>{text}</p>
    <i className={ico ? `btn__icon ${ico}` : 'hidden'}></i>
  </button>
  )
};

export default Button

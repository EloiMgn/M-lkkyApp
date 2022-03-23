import { useState } from 'react';
import './Button.scss'

const Button = ({text, action, ico, style, animation}) => {
  const[hover, setHover] = useState(null)

  const toogleHoverOn = () => {
    setHover(true)
  }
  const toogleHoverOff = () => {
  setHover(false)
  }

return (
  <button className={animation? "pushable animated":"pushable"} onClick={action} onMouseEnter={toogleHoverOn} onMouseLeave={toogleHoverOff}>
    <span className="shadow"></span>
    <span className="edge" style={hover ? style.backHoverStyle : style.backStyle}></span>
    <span className="front" style={hover ? style.frontHoverStyle : style.frontStyle}><p>{text}</p> <i className={ico ? `${ico}` : 'hidden'}></i></span>
  </button>
  )
};

Button.defaultProps = {
  style: {
    frontStyle: {
      "background": "#af8c5e",
      "transition": "200ms"
    },
    frontHoverStyle: {
      "background": "#219653",
      "transition": "300ms"
    },
    backStyle: {
      "background": `linear-gradient(to left, #7e5f33 0%, #6D522C 8%, #6D522C 92%, #7e5f33 100%)`,
      "transition": "200ms"
    },
    backHoverStyle: {
      "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`,
      "transition": "300ms"
    }
  }
}
export default Button

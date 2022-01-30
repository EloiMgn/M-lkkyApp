import './Button.scss'


const Button = ({text, size}) => (
  <button className={`btn ${size}`}>
    <p>{text}</p>
  </button>
)

export default Button

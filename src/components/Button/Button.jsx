import './Button.scss'

const Button = ({text, action, ico, colorFront, colorBack}) => {

  const frontStyle = {
    "background": `${colorFront}`
  }

  const edgeStyle = {
    "background": `${colorBack}`
  }
 
return (
  <button className="pushable" onClick={action}>
    <span className="shadow"></span>
    <span className="edge" style={edgeStyle}></span>
    <span className="front" style={frontStyle}><p>{text}</p> <i className={ico ? `${ico}` : 'hidden'}></i></span>
  </button>
  )
};

export default Button

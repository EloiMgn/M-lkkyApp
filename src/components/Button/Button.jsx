import './Button.scss'

const Button = ({text, action, ico, colorFront, colorBack1, colorBack2}) => {

  const frontStyle = {
    "background": `${colorFront}`
  }

  const edgeStyle = {
    "background": `linear-gradient(to left, ${colorBack1} 0%, ${colorBack2} 8%, ${colorBack2} 92%, ${colorBack1} 100%) `
  }
 
return (
  <button className="pushable" onClick={action}>
    <span className="shadow"></span>
    <span className="edge" style={edgeStyle}></span>
    <span className="front" style={frontStyle}><p>{text}</p> <i className={ico ? `${ico}` : 'hidden'}></i></span>
  </button>
  )
};

Button.defaultProps = {
  colorFront: "#af8c5e",
  colorBack1: "#7e5f33", 
  colorBack2: "#6D522C"

}
export default Button

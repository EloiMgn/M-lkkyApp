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
  colorFront: "hsl(345deg 100% 47%)",
  colorBack1: "hsl(340deg 100% 16%)", 
  colorBack2: "hsl(340deg 100% 32%)"

}
export default Button

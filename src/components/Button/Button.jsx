import './Button.scss'

const Button = ({text, action, ico, frontStyle, backStyle, colorBack2}) => {

  // const frontStyle = {
  //   "background": `${colorFront}`
  // }

  // const edgeStyle = {
  //   "background": `linear-gradient(to left, ${colorBack1} 0%, ${colorBack2} 8%, ${colorBack2} 92%, ${colorBack1} 100%) `
  // }
 
return (
  <button className="pushable" onClick={action}>
    <span className="shadow"></span>
    <span className="edge" style={backStyle}></span>
    <span className="front" style={frontStyle}><p>{text}</p> <i className={ico ? `${ico}` : 'hidden'}></i></span>
  </button>
  )
};

Button.defaultProps = {
  frontStyle: {
    "background": "#af8c5e"
  },
  backStyle: {
    "background": `linear-gradient(to left, #7e5f33 0%, #6D522C 8%, #6D522C 92%, #7e5f33 100%) `
  }

}
export default Button

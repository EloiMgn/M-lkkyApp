import './Title.scss'

const Title = ({text, marginTop}) => {
  return (
    <h1 className='mainTitle' style={{'marginTop':`${marginTop}`, 'marginBottom': `${marginTop}`}}>{text}</h1>
  )
}

Title.defaultProps = {
  'marginTop': '.5rem'
}

export default Title
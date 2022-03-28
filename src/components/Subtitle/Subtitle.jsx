import './Subtitle.scss'

const Subtitle = ({text, marginTop}) => {
  return (
    <h2 className='subtitle' style={{'marginTop':`${marginTop}`, 'marginBottom': `${marginTop}`}}>{text}</h2>
  )
}

Subtitle.defaultProps = {
  'marginTop': '.5rem'
}

export default Subtitle
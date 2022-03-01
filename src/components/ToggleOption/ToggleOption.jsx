import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './ToggleOption.scss'

const ToggleOption = ({action, details}) => {
  const [option, setOption] = useState(false)
  const [text, setText] = useState('OFF')
  const dispatch = useDispatch()

  const handleToggle = (action) => {
    setOption(!option)
  }

   useEffect(() => {
    dispatch({ type: "changeOption", option: `${action}`, optionValue: option})
    if(option) {
      setText('OUI')
    } else if (!option) {
      setText('NON')
    }
  }, [action, dispatch, option])


  return (
    <div className='option'>
      <h4 className='option__title'>{action}</h4>
      <p>{details}</p>
      <div onClick={e => handleToggle(action)} className={`switchContainer mode-${option}`}>
        <div className="point"></div>
        <div className='action'>{text}</div>
      </div>
    </div>
  )
}

export default ToggleOption

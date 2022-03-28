import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modale from '../../Modale/Modale';
import './ToggleOption.scss'

const ToggleOption = ({action, details, stateValue, explication}) => {
  const state = useSelector((state) => state)
  const [option, setOption] = useState(stateValue)
  const [text, setText] = useState('OFF')
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const handleToggle = () => {
    setOption(!option)
  }

   useEffect(() => {
    dispatch({ type: "changeOption", option: `${action}`, optionValue: option})
    if(option) {
      setText('OUI')
    } else if (!option) {
      setText('NON')
    }
  }, [action, dispatch, option, stateValue])

  const openModal = ()=> {
    setModal(true)
  }

  return (
    !state.playing? 
    <div className='option__container'>
      <div className='option'>
        <h4 className='option__title'>{details.charAt(0).toUpperCase() + details.slice(1)}</h4>
        <div onClick={e => handleToggle(action)} className={`switchContainer mode-${option}`}>
          <div className="point"></div>
          <div className='action'>{text}</div>
        </div>
      </div>
      {explication && <i className="fas fa-question-circle modalBtn" onClick={openModal}></i>}
      {/* {!explication && <i className="fas" onClick={openModal}></i>} */}
      {modal && <Modale title={action} text={explication} setModal={setModal}/>}
    </div>
    :
    <div className='option'>
      <h4 className='option__title'>{details.charAt(0).toUpperCase() + details.slice(1)}</h4>
      <span>{text}</span>
    </div>
  )
}

export default ToggleOption

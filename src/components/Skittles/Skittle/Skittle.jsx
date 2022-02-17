import { useState } from 'react';
import { useDispatch} from 'react-redux';
import './Skittle.scss'


const Skittle = ({frontValue}) => {
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch()

  // Handle selection of valid skittles :
  const handleClick = () => {
    setSelected(!selected);
    if(!selected){
      dispatch({type: "select", id: frontValue})
    } else if (selected){
      dispatch({type: "unSelect", id: frontValue})
    }
  }

  return (
    <div className={selected? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleClick()}>{frontValue}</div>
  )
}

export default Skittle
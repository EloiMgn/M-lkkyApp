import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Skittle.scss';

const Skittle = ({frontValue, color, setQuantity, disabled}) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  // Handle selection of valid skittles :
  const handleClick = () => {
    setSelected(!selected);
    setQuantity(0);
    if(!selected){
      dispatch({type: 'select', id: frontValue});
    } else if (selected){
      dispatch({type: 'unSelect', id: frontValue});
    }
  };
  if(!disabled){
    return (
      <div className={selected? 'skittle selected' : 'skittle'} onClick={() =>handleClick()} style={selected? {backgroundColor: `${color}`, border: 'solid 4px var(--tertiary)'}: {border: `solid 4px ${color}`}}>{frontValue}</div>
    );
  }  return (
    <div className='skittle disabledSkittle' onClick={() =>handleClick()} style={selected? {backgroundColor: `${color}`}: null}>{frontValue}</div>
  );
};

export default Skittle;
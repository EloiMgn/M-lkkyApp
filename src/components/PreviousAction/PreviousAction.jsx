
import { useSelector } from 'react-redux';
import './PreviousAction.scss'


const PreviousAction = () => {

  const state = useSelector((state) => state)
  // console.log(state);
  return (
    <div className='action'>
      {state.previousAction}
    </div>
   )
}

export default PreviousAction
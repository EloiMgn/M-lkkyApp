
import { useSelector } from 'react-redux';
import './PreviousAction.scss';


const PreviousAction = () => {

  const state = useSelector((state) => state);
  return (
    <div className='action'>
      {state.previousAction}
    </div>
  );
};

export default PreviousAction;
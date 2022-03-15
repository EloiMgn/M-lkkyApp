import './Options.scss'
import ToggleOption from './ToggleOption/ToggleOption';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Options = () => {
  const state = useSelector((state) => state)

  const [localState, setLocalState] = useState('')
  
  useEffect(() => {
    setLocalState(state)
  }, [state])
  if(localState){
    return (
      <div id="options" className="options">
       <ToggleOption action="élimination" details="élimination au bout de 3 lancés ratés" stateValue={localState.options.elimination}/>
       <ToggleOption action="égalisation" details="retour au palier si égalisation" stateValue={localState.options.egalisation}/>
       {/* <ToggleOption action="maxPoints" details="retour au palier si égalisation" stateValue={state.options.maxPoints}/> */}
     </div>
 
   )
 } return null

  }

export default Options
import './Options.scss'
import ToggleOption from './ToggleOption/ToggleOption';
import { useSelector } from 'react-redux';

const Options = () => {
  const state = useSelector((state) => state)

   return (
     <div id="options" className="options">
      <ToggleOption action="élimination" details="élimination au bout de 3 lancés ratés" stateValue={state.options.elimination}/>
      {/* <ToggleOption action="égalisation" details="retour au palier si égalisation" stateValue={state.options.egalisation}/> */}
      {/* <ToggleOption action="maxPoints" details="retour au palier si égalisation" stateValue={state.options.maxPoints}/> */}
    </div>

  )
}

export default Options
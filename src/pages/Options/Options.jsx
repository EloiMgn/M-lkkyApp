import './Options.scss'
import Header from '../../components/Header/Header'
import ToggleOption from '../../components/ToggleOption/ToggleOption';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';

const Options = () => {
  const state = useSelector((state) => state)

  return (
    <div id="options" className="options">
      <Header/>
      <main className='options__content'>
        {/* <h3>Sélectionnez les options de jeu souhaitées</h3> */}
        <ToggleOption action="élimination" details="au bout de 3 lancés ratés" stateValue={state.options.elimination}/>
        <Button elt={"Dashboard"} className='Dashboard__btn' text={"Valider"} link={"/dashboard"} size={"small"}/>
      </main>
      <Footer/>
    </div>
  )
}

export default Options
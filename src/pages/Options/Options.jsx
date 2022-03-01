import './Options.scss'
import Header from '../../components/Header/Header'
import ToggleOption from '../../components/ToggleOption/ToggleOption';
import Button from '../../components/Button/Button';

const Options = () => {
  return (
    <div id="options" className="options">
      <Header/>
      <main className='options__content'>
        <h3>Sélectionnez les options de jeu souhaitées</h3>
        <ToggleOption action="élimination" details="au bout de 3 lancés ratés"/>
        <Button elt={"Dashboard"} className='Dashboard__btn' text={"Valider"} link={"/dashboard"} size={"small"}/>
      </main>
    </div>
  )
}

export default Options
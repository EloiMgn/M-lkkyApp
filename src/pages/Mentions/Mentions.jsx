import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";

const Mentions = () => {
  return (
    <main className='Home__content'>
      <Title text={'Mentions Légales'}/>
      <div>
        Flaticons : <a href="https://www.flaticon.com/fr/icones-gratuites/construction" target="_blank" title="construction icônes" rel="noreferrer">Construction icônes créées par Vichanon Chaimsuk - Flaticon</a>
      </div>
      <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
    </main>

  )
}

export default Mentions

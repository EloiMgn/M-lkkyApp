import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import './Mentions.scss'

const Mentions = () => {
  return (
    <main className='Mentions__content'>
      <Title text={'Mentions Légales'}/>
      <div>
        <p>Ce site a été créé et appartient dans sa totalité à Eloi Magnien</p>
      </div>
      {/* <div>
        Flaticons : <a href="https://www.flaticon.com/fr/icones-gratuites/construction" target="_blank" title="construction icônes" rel="noreferrer">Construction icônes créées par Vichanon Chaimsuk - Flaticon</a>
      </div> */}
      <div>
        <i class="fab fa-twitter"></i> :<a href="https://twitter.com/MolkKingApp" target="_blank" rel="noreferrer">Suivez-moi sur twitter pour connaitre les dernières infos de l'app !</a>
      </div>
      <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
    </main>

  )
}

export default Mentions

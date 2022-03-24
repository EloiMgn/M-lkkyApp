import { Link } from 'react-router-dom';
import Subtitle from '../../components/Subtitle/Subtitle';
import Title from '../../components/Title/Title';
import './Bug.scss'

const Bug = () => {
  return (
    <main id="Bug" className="bug">
    <Title text={'Signaler un bug'}/>
    <Subtitle text="Vous avez trouvé un bug et souhaitez me le signaler ?"/>
        <p>Envoyez-moi un email à <a href="mailto:molkking@eloimagnien.com">molkking@eloimagnien.com</a></p>
      <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
    </main>
  )
}

export default Bug

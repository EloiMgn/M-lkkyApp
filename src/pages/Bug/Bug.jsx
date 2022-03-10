import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Bug.scss'

const Bug = () => {
  return (
    <div id="Bug" className="bug">
    <Header/>
    <main className='bug__content'>
    <h1>Signaler un bug</h1>
        <h2>Vous avez trouvé un bug et souhaitez me le signaler ?</h2>
        <p>Envoyez-moi un email à <a href="mailto:molkking@eloimagnien.com">molkking@eloimagnien.com</a></p>
      <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
    </main>
    <Footer/>
  </div>
  )
}

export default Bug

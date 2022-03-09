import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Mentions = () => {
  return (
    <div id="Home" className="Home">
        <Header/>
        <main className='Home__content'>
          <div>
            Flaticons : <a href="https://www.flaticon.com/fr/icones-gratuites/construction" title="construction icônes">Construction icônes créées par Vichanon Chaimsuk - Flaticon</a>
          </div>
          <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
        </main>
        <Footer/>
      </div>

  )
}

export default Mentions

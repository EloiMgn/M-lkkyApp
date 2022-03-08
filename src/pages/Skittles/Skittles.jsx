import './Skittles.scss'
import Header from '../../components/Header/Header'
import StartSkittles from '../../utils/img/1024px-Molkky,_game_start.svg.png'
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom'

const Skittles = () => {
  return (
    <div id="Skittles" className="Skittles">
      <Header/>
      <main className='Skittles__body'>
        <h1>Placement des quilles en début de partie:</h1>
        <div className='Skittles__body__content'>
          <div className='Skittles__body__content__imgContainer'>
            <img className='Skittles__body__content__imgContainer-img'src={StartSkittles} alt="" />
          </div>
        </div>
        <Link to='/' className='Skittles__back'>Retour à l'accueil</Link>
      </main>
      <Footer/>
    </div>
  )
}

export default Skittles
import './Home.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'

const Home = () => {
  return (
    <div id="Home" className="Home">
      <Header/>
      <main className='Home__content'>
        <Button text='Démarrer une nouvelle partie' size={"medium"}/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
import './Home.scss'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'


const Home = () => {
  // check localStorage
  const rawLocalStorage = getLocalStorage()

  const handleStartNewGame = () => {

    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }
    const handleContinueGame = () => {

    }

if(rawLocalStorage !== null) {
    const localStorage = JSON.parse(rawLocalStorage)
    console.log(localStorage);
    if(localStorage.state.teams.length > 0) {
      return (
        <div id="Home" className="Home">
          <Header/>
          <main className='Home__content'>
            <Button elt={"Home"} text='Démarrer une nouvelle partie' size={"medium"} link={"/Dashboard"} action={handleStartNewGame}/>
            <Button elt={"Home"} text='Continuer ma partie' size={"medium"} link={"/Dashboard"} />
          </main>
          <Footer/>
        </div>
      )
    } return null
  } return (
    <div id="Home" className="Home">
      <Header/>
      <main className='Home__content'>
        <Button elt={"Home"} text='Démarrer une nouvelle partie' size={"medium"} link={"/Dashboard"} action={handleStartNewGame}/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
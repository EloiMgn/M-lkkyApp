import './App.scss';
// import { useContext } from 'react'
// import { Store } from '../../utils/Provider/Provider'
// import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import Routing from '../../Router/Router'


const App = () => {
  // const { theme } = useContext(Store)
  
  return (
    <div id="App" className={`theme-dark`}>
        <div className='App__content-body'>
          <Routing />
        </div>
    </div>
  )
}

export default App

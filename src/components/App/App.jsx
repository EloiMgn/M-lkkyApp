import './App.scss';
import Routing from '../../Router/Router'
import Header from '../Header/Header';


const App = () => {
  return (
    <div id="App" className={`theme-light`}>
        <div className='App__content-body'>
          <Routing />
        </div>
    </div>
  )
}

export default App

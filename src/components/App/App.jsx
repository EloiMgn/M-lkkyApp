import './App.scss';
import Routing from '../../Router/Router'


const App = () => {
  return (
    <div id="App" className={`theme-dark`}>
        <div className='App__content-body'>
          <Routing />
        </div>
    </div>
  )
}

export default App

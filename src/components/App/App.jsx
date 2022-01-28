import './App.scss';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routing from '../../Router/Router'

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
        <div className='App__content-body'>
          <Routing />
        </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

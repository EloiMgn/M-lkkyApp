import './Home.scss'
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <div id="Home" className="Home">
      <div className='Home__content'>
        {/* <div className='Home__content-body'> */}
          <Header/>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Home
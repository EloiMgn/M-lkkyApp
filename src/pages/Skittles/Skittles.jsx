import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import StartSkittles from '../../utils/img/1024px-Molkky,_game_start.svg.png';
import './Skittles.scss';

const Skittles = () => {
  return (
    <main className='Skittles'>
      <Title text={'Placement des quilles en début de partie'}/>
      <div className='Skittles__content'>
        <div className='Skittles__content__imgContainer'>
          <img className='Skittles__content__imgContainer-img'src={StartSkittles} alt="" />
        </div>
      </div>
      <Link to='/' className='Skittles__back'>Retour à l&apos;accueil</Link>
    </main>
  );
};

export default Skittles;
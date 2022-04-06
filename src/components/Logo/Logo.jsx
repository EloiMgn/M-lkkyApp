import { Link } from 'react-router-dom';
import mainLogo from '../../utils/img/logo.png';
import './Logo.scss';

const Logo = () => (
  <div id="logo" className='logo'>
    <Link to="/" className='logo__link'><img src={mainLogo} alt="logo"/></Link>
  </div>
);

export default Logo;

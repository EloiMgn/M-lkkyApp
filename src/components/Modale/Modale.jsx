
import { useState } from 'react';
import Subtitle from '../Subtitle/Subtitle';
import './Modale.scss';


const Modale = ({title, text, setModal, listTitle}) => {
  const[open, setOpen] = useState(true);

  const handleClose = () =>{
    setOpen(!open);
    setModal(false);
  };

  console.log(typeof(text));

  return (
    <div className='modale__background'>
      <div className={open? 'modale': 'modale__hidden'}>
        <div className="modale__close">
          <i className="fas fa-times modale__close__icon" onClick={handleClose}></i>
        </div>
        <div className='modale__text'>
          <Subtitle text={title}/>
          {typeof(text) === 'string' && <p className='modale__text-string'>{text}</p>}
          {typeof(text) === 'object' &&
          <div className='modale__text-sub'>
            <h2 className='modale__list__title'>{listTitle}</h2>
            <ul className='modale__list'>
              {text.map((value, idx) => {
                return (
                  <li key={idx} className='modale__list-item'><p>{value}</p></li>
                );
              })}
            </ul>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Modale;


import { useState } from 'react';
import './Modale.scss';

const Modale = ({title, text, setModal}) => {
  const[open, setOpen] = useState(true);

  const handleClose = () =>{
    setOpen(!open);
    setModal(false);
  };

  return (
    <div className='modale__background'>
      <div className={open? 'modale': 'modale__hidden'}>
        <div className="modale__close">
          <i className="fas fa-times modale__close__icon" onClick={handleClose}></i>
        </div>
        <div className='modale__text'>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Modale;

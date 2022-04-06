
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
          {typeof(text) === 'string' && <p>{text}</p>}
          {typeof(text) === 'object' && 
          <div className='modale__playerList'>
            <h2>{listTitle}</h2>
            <ul>
            {text.map((value, idx) => {
            return (
              <li key={idx} className='modalePlayer'>{value}</li>
                )
              })}
            </ul>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Modale;

import Construction from '../../utils/img/construction.png'
import { useState } from 'react'
import './HomeModale.scss'
import { getLocalStorage } from '../../utils/localStorage';



const HomeModale = () => {
  const localStorage = getLocalStorage()

  const[open, setOpen] = useState(true)

  const handleClose = () =>{
    setOpen(false)
  }
  if(!localStorage){
    return (
      <div className={open? 'modale': 'modale__hidden'}>
        <div className="modale__close">
          <i className="fas fa-times modale__close__icon" onClick={e =>handleClose()}></i>
        </div>
        <div className='modale__text'>
          <p>Bienvenue sur Molkking !!</p>
          <img src={Construction} alt="icone construction" className='image'/>
          <p>Ce site est toujours en cours de développement et n'est pas 100% fonctionnel</p>
          <p>N'hésitez pas à me rapporter les bugs auxquels vous feriez face à <a href="mailto:molkking@eloimagnien.com">molkking@eloimagnien.com</a></p>
        </div>
      </div>
    )
  } else return null
}

export default HomeModale

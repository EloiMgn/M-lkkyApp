import Construction from '../../utils/img/construction.png'
import { useEffect, useState } from 'react'
import './HomeModale.scss'
import { getLocalStorage } from '../../utils/localStorage';
import { isToday } from '../../utils/tools';



const HomeModale = () => {
  const rawLocalStorage =JSON.parse(getLocalStorage('modal'))
  const[today, setToday] = useState(false)

  const checkIfToday = () =>{
    if(rawLocalStorage){
      if(isToday(rawLocalStorage.date)){
        setToday(true)
      }
    }
  }

  useEffect(() => {
    checkIfToday()
  },)

  const[open, setOpen] = useState(true)

  const handleClose = () =>{
    localStorage.setItem('modal', JSON.stringify({ date: new Date().toDateString()}))
    setOpen(false)
  }

  if(!today){
    return (
      <div className={open? 'modale': 'modale__hidden'}>
        <div className="modale__close">
          <i className="fas fa-times modale__close__icon" onClick={e =>handleClose()}></i>
        </div>
        <div className='modale__text'>
          <p>Bienvenue sur Molkking !!</p>
          <img src={Construction} alt="icone construction" className='image'/>
          <p>Ce site est toujours en cours de développement et n'est pas 100% fonctionnel (notamment le mode avec élimination)</p>
          <p>N'hésitez pas à me rapporter les bugs auxquels vous feriez face à <a href="mailto:molkking@eloimagnien.com">molkking@eloimagnien.com</a></p>
        </div>
      </div>
    )
  } else return null
}

export default HomeModale

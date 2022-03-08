import './Player.scss'

const Player = ({action, i, player}) => {
  return (
    <div className={`player player${i+1}`}  key={i}>
      <div className="player__Name">Joueur {i+1} : <strong>{player}</strong></div>
      <button className='playerForm__btn-delete' onClick={action}><p>Supprimer</p></button>
    </div>
  ) 
}

export default Player;
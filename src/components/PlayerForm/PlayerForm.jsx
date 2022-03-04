import './PlayerForm.scss'
import { useState } from 'react';

const PlayerForm = ({list, setList}) => {
  const [player, setPlayer] = useState('')

  // handle input change
  const handleInputChange = (e, index) => {
    setPlayer(e.target.value)
  }
  
  // handle hide previous input on click on add player
  const handleAddPlayer = (i) => {
    list[i].hide = true

  }

  // handle click event of the Add button
  const handleAddClick = (i) => {
    if(player !== "") {
    const newPlayerList = [...list]
    newPlayerList[i].player = player
    handleAddPlayer(i)
    setList([...newPlayerList, { player: "", hide: false}]);
    setPlayer('')
    }
  }

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    const playerList = [...list];
    playerList.splice(index, 1);
    setList(playerList);
  }
  
return (
<div className="playerForm">
  {list.map((x, i) => {
      if (list.length > 1 && x.player !== "" && list[i+1]) {
        return (
          <div className={`playerForm__player player${i+1}`}  key={i}>
            <div className="playerName">Joueur {i+1} : <strong>{x.player}</strong></div>
            <button className='playerForm__btn-delete' onClick={(e) => handleRemoveClick(e, i)}><p>Supprimer</p></button>
          </div>
        ) 
      } return null
    })}
        {list.map((x, i) => {
          if(!x.hide) {
            return (
              <div className="addPlayer__form" key={i}>
                <h3>Ajouter un joueur</h3>
                <div className='addPlayer'>
                  <div className="addPlayer__input">
                    <label htmlFor="player">Joueur {i+1}</label>
                    <input
                    id="player"
                      name="player"
                      placeholder=""
                      onChange={e => handleInputChange(e, i)}
                      onBlur={e => handleAddClick(i)}
                      className={player.length > 0? 'playerSmall' : 'inputBig'}
                    />
                  </div>
                  <div className="btn-box">
                    {player !== "" && <button className='playerForm__btn-add'  onClick={e => handleAddClick(i)}>OK</button>}
                  </div>
                </div>
            </div>
          )}
          return null
        })}
      </div>
  )
}

export default PlayerForm;



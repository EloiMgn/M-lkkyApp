import './PlayerForm.scss'
import { useState } from 'react';

const PlayerForm = ({list, setList, setToogle}) => {
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
    setToogle(false)
    }
  }

  
    // handle validate team Name
    const handleAddEnter = (e, i) => {
      if(player !== "" && e.key === "Enter") {
        const newPlayerList = [...list]
        newPlayerList[i].player = player
        handleAddPlayer(i)
        setList([...newPlayerList, { player: "", hide: false}]);
        setPlayer('')
        setToogle(false)
        }
    }


  
return (
<div className="playerForm">
        {list.map((x, i) => {
          if(!x.hide) {
            return (
              <div className="addPlayer__form" key={i}>
                    <label className="addPlayer__label" htmlFor="player">Joueur {i+1}</label>
                <div className='addPlayer'>
                  <div className="addPlayer__input">
                    <input
                    placeholder={`Entrez le prénom du joueur ${i+1}`}
                      id="player"
                      name="player"
                      onChange={e => handleInputChange(e, i)}
                      onBlur={e => handleAddClick(i)}
                      onKeyPress={e => handleAddEnter(e, i)}
                      className={player.length > 0? 'playerSmall' : 'inputBig'}
                      autoFocus={true}
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



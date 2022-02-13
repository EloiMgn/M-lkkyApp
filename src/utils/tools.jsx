
export const getDateFromFolderName = (folderName) => {
  const regex = /[0-9]{8}/
  const rawDate = folderName.match(regex)
  const date = rawDate[0].slice(0, 4) + '/' + rawDate[0].slice(4, 6) + '/' + rawDate[0].slice(6)
  return new Date(date)
}

export const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
}

export const localStorageDateToNewDate = (someDate) => {
  return new Date(someDate.toString().slice(0, 10))
}

export const is_touch_device = () => {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

export const checkWinner = (teamScore) => {
  if (teamScore === 50) {
    return true
  } else return false
}

export const setLevel = (teamScore) => {
  if(teamScore >= 25) {
    return true
  } else return false
}

export const checkIfEqual = (teams, teamScore, i) => {
  const teamScores= []
  teams.forEach(team => {
    if(teams[i] !== team) {
      teamScores.push(team)
    }
  })
  for (let j = 0; j < teamScores.length; j++) {
    if(teamScore === teamScores[j].score && teamScore !== 0) {
      return teamScores[j]
    } else return null
  }
}


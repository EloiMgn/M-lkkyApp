
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



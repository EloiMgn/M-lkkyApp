export const getLocalStorage = () => {
  const value = localStorage.getItem('molkking_param')
  return value
}

export const setLocalStorage = (value) => {
  localStorage.setItem('molkking_param', JSON.stringify(value))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('molkking_param')
}

export const getLocalStorage = () => {
  const value = localStorage.getItem('oneyearago_param')
  return value
}

export const setLocalStorage = (value) => {
  localStorage.setItem('oneyearago_param', JSON.stringify(value))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('oneyearago_param')
}

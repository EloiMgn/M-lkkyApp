export const getLocalStorage = (param) => {
  const value = localStorage.getItem(`${param}`);
  return value;
};

export const setLocalStorage = (value) => {
  localStorage.setItem('molkking_param', JSON.stringify(value));
};

export const removeLocalStorage = () => {
  localStorage.removeItem('molkking_param');
  localStorage.removeItem('previousState');
};

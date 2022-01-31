import { useContext } from 'react'
import { Store } from '../../utils/Provider/Provider'

import './ToggleTheme.scss'

const ToggleTheme = () => {
  const { theme, changeTheme } = useContext(Store)

  return (
    <div
      onClick={changeTheme}
      className={`switchContainer mode-${theme}`}
      >
      <div className="point"></div>
      <div className="theme">{theme}</div>
    </div>
  )
}

export default ToggleTheme

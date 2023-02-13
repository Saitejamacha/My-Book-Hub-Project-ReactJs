import React from 'react'

const appContext = React.createContext({
  activeNavOption: '',
  onClickChangeOption: () => {},
  showNavIcons: false,
  onToggleIcon: () => {},
  onClose: () => {},
  isDarkTheme: false,
  onToggleTheme: () => {},
})

export default appContext

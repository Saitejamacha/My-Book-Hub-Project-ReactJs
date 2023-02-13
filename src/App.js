import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import LoginForm from './components/LoginRoute'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import './App.css'
import appContext from './context/appContext'

class App extends Component {
  state = {
    showNavIcons: false,
    activeNavOption: 1,
    isDarkTheme: false,
  }

  onClickChangeOption = navId => {
    this.setState({activeNavOption: navId})
  }

  onToggleIcon = () => {
    this.setState(prevState => ({
      showNavIcons: !prevState.showNavIcons,
    }))
  }

  onClose = () => {
    this.setState({showNavIcons: false})
  }

  render() {
    const {showNavIcons, activeNavOption, isDarkTheme} = this.state

    return (
      <appContext.Provider
        value={{
          showNavIcons,
          activeNavOption,
          onClickChangeOption: this.onClickChangeOption,
          onToggleIcon: this.onToggleIcon,
          isDarkTheme,
          onClose: this.onClose,
          onToggleTheme: this.onToggleTheme,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={BookShelves} />
            <ProtectedRoute exact path="/books/:id" component={BookDetails} />
            <ProtectedRoute exact path="/notFound" component={NotFound} />
            <Redirect to="/notFound" />
          </Switch>
        </>
      </appContext.Provider>
    )
  }
}

export default App

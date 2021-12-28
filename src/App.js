import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SideNav from './components/SideNav'
import Signup from './pages/signup/Signup'
import Finplan from './pages/home/FInancial/Finplan'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          {user && <SideNav />}
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route path="/finplan">
              <Finplan />
            </Route>
            <Route path="*">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App

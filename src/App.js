import './App.css';
import Header from './Components/Header/Header';
import Welcome from './Pages/welcomePage/Welcome';
import Register from './Pages/RegisterPage/Register';
import Login from './Pages/LoginPage/Login';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Dashboard from './Pages/DashboardPage/Dashboard';
import { GlobalStateContextProvider } from './Context/GlobalStateContext';


function App() {
  return (
  <GlobalStateContextProvider>
    <Router>
      <div className="appBackground">
        <Header/>
          <div className="content">
            <Switch>
              <Route exact path="/" component ={Welcome} />
              <Route path="/register" component ={Register} />
              <Route path="/login" component ={Login} /> 
              <Route path ="/dashboard" component={Dashboard} />
            </Switch>
            </div>
        </div>
    </Router>
    </GlobalStateContextProvider>
  );
}

export default App;

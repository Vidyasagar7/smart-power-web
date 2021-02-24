import './App.css';
import Header from './Components/Header/Header';
import Welcome from './Pages/welcomePage/Welcome';
import Register from './Pages/RegisterPage/Register';
import Login from './Pages/LoginPage/Login';
//import Bulb from './images/Bulb.jpg';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="appBackground">
        <Header/>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Welcome/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
            </Switch>
            </div>
        </div>
    </Router>
  );
}

export default App;

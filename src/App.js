import './App.css';
import Header from './Components/Header/Header';
import Welcome from './Pages/welcomePage/Welcome';
import Register from './Pages/RegisterPage/Register';
import Login from './Pages/LoginPage/Login';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="appBackground">
        <Header/>
          <div className="content">
            <Switch>
              <Route exact path="/" component ={Welcome} />
              <Route path="/register" component ={Register} />
              <Route path="/login" component ={Login} />
            </Switch>
            </div>
        </div>
    </Router>
  );
}

export default App;

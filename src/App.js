import './App.css';
import Header from './Components/Header/Header';
import Welcome from './Pages/welcomePage/Welcome';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Dashboard from './Pages/DashboardPage/Dashboard';
import { GlobalStateContextProvider } from './Context/GlobalStateContext';
import AuthProvider from './Components/Auth/AuthProvider';
import ProtectedRoute from './Routes/ProtectedRoute';


function App() {
  return (
  <GlobalStateContextProvider>
    <Router>
    <AuthProvider>
      <div className="appBackground">
        <Header/>
          <div className="content">
            <Switch>
              <Route exact path="/" component ={Welcome} />
              <ProtectedRoute path ="/dashboard" component={Dashboard} />
            </Switch>
            </div>
        </div>
    </AuthProvider>
    </Router>
    </GlobalStateContextProvider>
  );
}

export default App;

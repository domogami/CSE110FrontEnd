import './App.css';
import Login from '../login/index';
import Home from "../home/index"
import SignUp from "../signup/index"
import PrivateRoute from "../../auth/PrivateRoute"
import { AuthProvider } from "../../auth/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"
import CreateProfileIndividual from '../createProfileIndividual';
import Profile from '../profile/index';
import FindOrg from '../findOrg';

function App() {

  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <header className="App-header">
          <PrivateRoute exact path ="/home" component={ Home } />
          <Route exact path ="/findOrg" component={ FindOrg } />  
          <Route exact path ="/profile" component={ Profile } />  
          <Route exact path ="/createProfileIndividual" component={ CreateProfileIndividual }/>
          <Route exact path ="/login" component={ Login } />
          <Route exact path ="/signup" component={ SignUp } />  
      </header>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

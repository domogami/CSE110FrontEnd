import './App.css';
import Login from '../login/index';
import Home from "../home/index"
import SignUp from "../signup/index"
import PrivateRoute from "../../auth/PrivateRoute"
import { AuthProvider } from "../../auth/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {

  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <header className="App-header">
          <PrivateRoute exact path ="/" component={ Home } />
          <Route exact path ="/login" component={ Login } />
          <Route exact path ="/signup" component={ SignUp } />  
      </header>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
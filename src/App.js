import './App.css';
import Login from './routes/LogIn';
import Home from "./routes/Home"
import SignUp from "./routes/SignUp"
import PrivateRoute from "./auth/PrivateRoute"
import { AuthProvider } from "./auth/Auth"
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

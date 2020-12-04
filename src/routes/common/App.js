import './App.css';
import Login from '../login/index';
import Home from "../home/index"
import SignUp from "../signup/index"
import PrivateRoute from "../../auth/PrivateRoute"
import { AuthProvider } from "../../auth/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"
import CreateProfileIndividual from '../createProfileIndividual';
import CreateProfileOrg from '../createProfileOrg';
import Profile from '../profile/index';
import FindOrg from '../findOrg';
import UserSelect from '../userSelect';
import Post from '../post';

function App() {

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <PrivateRoute exact path ="/" component={ Home } />
                        <Route exact path ="/findOrg" component={ FindOrg } />
                        <Route exact path ="/profile" component={ Profile } />
                        <Route exact path ="/createProfileIndividual" component={ CreateProfileIndividual }/>
                        <Route exact path ="/createProfileOrg" component={ CreateProfileOrg }/>
                        <Route exact path ="/login" component={ Login } />
                        <Route exact path ="/signup" component={ SignUp } />
                        <Route exact path ="/userSelect" component={ UserSelect } />
                        <Route exact path ="/post" component={ Post } />
                    </header>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
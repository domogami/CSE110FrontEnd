import { BrowserRouter as Router, Route } from "react-router-dom";
import './app.css';

import PrivateRoute from "../../auth/PrivateRoute";
import { AuthProvider } from "../../auth/Auth";

import Login from '../../routes/login/index';
import Home from "../../routes/home/index";
import Register from "../../routes/registration";
import Profile from '../../routes/profile/index';
import FindOrg from '../../routes/findOrg';
import Post from '../../routes/post';

export default () => (
    <AuthProvider>
        <Router>
            <div className="App">
                <header className="App-header">
                    <PrivateRoute exact path ="/" component={ Home } />
                    <Route exact path ="/findOrg" component={ FindOrg } />
                    <Route exact path ="/profile" component={ Profile } />
                    <Route exact path ="/register" component={ Register }/>
                    <Route exact path ="/login" component={ Login } />
                    <Route exact path ="/post" component={ Post } />
                </header>
            </div>
        </Router>
    </AuthProvider>
);
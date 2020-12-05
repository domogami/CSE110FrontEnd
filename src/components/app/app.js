import { BrowserRouter as Router, Route } from "react-router-dom";
import './app.css';

import PrivateRoute from "../../auth/PrivateRoute";
import { AuthProvider } from "../../auth/Auth";

import Login from '../../routes/login/index';
import Home from "../../routes/home/index";
import Register from "../../routes/registration";
import Profile from '../../routes/profile/index';
import FindOrg from '../../routes/findOrg';
import FindEvent from '../../routes/findEvent';
import Post from '../../routes/post';

const routes = [
    { path: "/",          Component: Home,      private: true },
    { path: "/findOrg",   Component: FindOrg,   private: true },
    { path: "/findEvent", Component: FindEvent, private: true },
    { path: "/profile",   Component: Profile,   private: true },
    { path: "/register",  Component: Register,  private: true },
    { path: "/login",     Component: Login,     private: false },
    { path: "/post",      Component: Post,      private: true },
];

export default () => (
    <AuthProvider>
        <Router>
            <div className="App">
                <header className="App-header">
                    {
                        routes.map(route => (route.private ?
                            <PrivateRoute exact path={route.path} component={route.Component} /> :
                            <Route exact path={route.path} component={route.Component} />))
                    }
                </header>
            </div>
        </Router>
    </AuthProvider>
);
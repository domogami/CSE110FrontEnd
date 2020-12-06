import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./Auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={`/login${(rest.path || !rest.path) == "/" ? "" : `?redirect=${encodeURIComponent(rest.path)}`}`} />
                )
            }
        />
    );
};

export default PrivateRoute;
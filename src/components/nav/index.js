import { Component } from 'react';
import { matchPath, NavLink, useRouteMatch } from 'react-router-dom';

import API from "../../api/index";
import Filter from "../filter";
import { SiteLogo }  from "../../images/logo";
import "./nav.css";

export default class NavHeader extends Component {

    render() {
        return (
            <div className="headerContainer">
                <div className="titleProfile">
                    <div className="headerTitle">
                        <img className="headerLogo" src={SiteLogo} alt="logo"/>
                        <h1>Philanthropy Connect</h1>                    
                    </div>
                    <img className="profilePic" src={API.me ? API.me.picture : ""} alt="profilePic"/>
                </div>
                <div className="pageFilterButtons">
                    {   
                        API.isIndividual && 
                        <div className="headerButton">
                            <NavLink exact activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Find Org</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/findEvent"><p>Find Event</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                        </div>
                    }{
                        API.isOrganization &&
                        <div className="headerButton">
                            <NavLink exact activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Post</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Stats</p></NavLink>
                            <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                        </div>
                    }

                    <div className="filterButton">
                        {/*Filter buttons stuff*/}
                        <Filter/>
                    </div>


                </div>
            </div>
        );
    }
}
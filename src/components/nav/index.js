import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from '../searchBar/index';
import API from "../../api/index";

import { SiteLogo }  from "../../images/logo";
import "./nav.css";

export default class NavHeader extends Component {
    render() {
        let isIndiviual = true;
        return (
            <div className="headerContainer">
                <div className="titleProfile">
                    <div className="headerTitle">
                        <img className="headerLogo" src={SiteLogo} alt="logo"/>
                        <h1>Philanthrophy Connect</h1>                    
                    </div>
                    <img className="profilePic" src={API.me ? API.me.picture : ""} alt="profilePic"/>
                </div>
                <div className="headerSearchBar">
                    { isIndiviual ? 
                    <div className="headerButton">
                        <NavLink exact activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                        <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Find Org</p></NavLink>
                        <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                    </div> : 
                        <div className="headerButtonOrg">
                        <NavLink exact activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                        <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Post</p></NavLink>
                        <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Stats</p></NavLink>
                        <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                    </div>
                    }
                    <SearchBar/>
                </div>
            </div>
        );
    }
}
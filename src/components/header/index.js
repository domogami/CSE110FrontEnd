import React, {Component} from 'react';
import "./header.css";
import Logo from "../../routes/common/images/logo.svg";
import profilePic from "../../routes/common/images/logo.svg"
import { NavLink } from 'react-router-dom';
import SearchBar from '../searchBar/index';

export class Header extends Component {
    render() {
        var isIndiviual = true;
        return (
            <div className="headerContainer">
                <div className="titleProfile">
                    <div className="headerTitle">
                        <img className="headerLogo" src={Logo} alt="logo"/>
                        <h1>
                            Philanthrophy Connect                        
                        </h1>                    
                    </div>
                    <img className="profilePic" src={profilePic} alt="profilePic"/>
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

export default Header;
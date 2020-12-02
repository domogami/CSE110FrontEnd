import React, {Component} from 'react';
import "./header.css";
import Logo from "../../routes/common/images/logo.svg";
import { NavLink } from 'react-router-dom';
import SearchBar from '../searchBar/index';
import API from "../../api/index";

//logo + title + profilepic?
//filters/ search bar part 

//activeClassName... 


export class Header extends Component {
    render() {
        let isIndiviual = true;
        return (
            <div>
                <div className="titleProfile">
                    <div className="headerTitle">
                        <img className="headerLogo" src={Logo} alt="logo"/>
                        <h1>Philanthrophy Connect</h1>                    
                    </div>
                    <img className="profilePic" src={API.me ? API.me.picture : ""} alt="profilePic"/>
                </div>

                {/*pageName*/}
                <div>
                { isIndiviual ? 
                <div className="headerButton">
                    <NavLink activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                    <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Find Org</p></NavLink>
                    <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                </div> : 
                    <div className="headerButtonOrg">
                    <NavLink activeClassName="active" className="menuButton" to="/"><p>Home</p></NavLink>
                    <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Post</p></NavLink>
                    <NavLink activeClassName="active" className="menuButton" to="/findOrg"><p>Stats</p></NavLink>
                    <NavLink activeClassName="active" className="menuButton" to="/profile"><p>Profile</p></NavLink>
                </div>
                }

                <SearchBar></SearchBar>
                </div>

            </div>
            
            
        );
    }
}

export default Header;
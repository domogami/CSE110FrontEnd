import React, {Component} from 'react';
import "./header.css";
import Logo from "../../routes/common/images/PhilConLogo.png";
import profilePic from "../../routes/common/images/PhilConLogo.png"

//logo + title + profilepic?
//filters/ search bar part 

//activeClassName... 

export class Header extends Component {
    render() {
        return (
            <div>
                <div className="titleProfile">
                <div className="headerTitle">
                    <img className="headerLogo" src={Logo} alt="logo"/>

                    <h1>
                        Philanthrophy Connect                        
                    </h1>                    
                </div>

                <img className="profilePic" src={profilePic} alt="profilePic"/>
                </div>



                //pageName
                <div className="pageName">
                
                </div>

            </div>
            
            
        );
    }
}

export default Header;
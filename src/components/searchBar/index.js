import React, {Component} from 'react';
import Search from '../../routes/common/images/searchIcon';
import "./searchBar.css";


export class SearchBar extends Component {
    render() {
        return (
            <div>
            <div className="fullBar">
                {/*magnify*/}
                <div className= "maginify">
                    <Search/>
                </div>

                {/*bar*/}
                <div className= "bar">
                    <input placeholder="Search"/>
                </div>
            </div>
            </div>          
        );
    }
}

export default SearchBar;
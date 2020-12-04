import { Component } from 'react';
import "./searchBar.css";
import { FilterIcon, SearchIcon } from "../../images/icons";

export class SearchBar extends Component {
    render() {
        return (
            <div className="barFilter">
                <div className="fullBar">
                    {/*magnify*/}
                    <div className= "maginify">
                        <img src={SearchIcon} />
                    </div>

                    {/*bar*/}
                    <div className= "bar">
                        <input placeholder="Search"/>
                    </div>
                </div>
                <img src={FilterIcon} className="filter" />
            </div>          
        );
    }
}

export default SearchBar;
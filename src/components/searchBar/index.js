import React, {Component} from 'react';
import Search from '../../routes/common/images/icons/searchIcon';
import "./searchBar.css";
import Filter from '../../routes/common/images/icons/filterIcon';

export class SearchBar extends Component {
    render() {
        return (
            <div className="barFilter">
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
                <Filter className="filter"></Filter>
            </div>          
        );
    }
}

export default SearchBar;
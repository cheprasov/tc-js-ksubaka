import React from 'react';

import SearchInput from './search-input.js';
import SearchResult from './search-result.js';
import Navigation from './navigation.js';

export default class PageMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchData: null,
        };
    }

    /**
     * @param {SearchData} searchData
     */
    updateSearchInput(searchData) {
        this.setState({searchData});
    }

    render() {
        return (
            <div>
                <Navigation />
                <SearchInput
                    onUpdateSearchInput={searchData => this.updateSearchInput(searchData)}
                />
                <SearchResult
                    searchData={this.state.searchData}
                    storage={this.props.storage}
                />
            </div>
        );
    }

}

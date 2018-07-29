import React from 'react';

import SearchData from '/SRC/dto/search-data';
import { isMobileDevice } from '/SRC/utils/mobile-detector.js';

const SEARCH_QUERY_TIMEOUT = 500;

export default class SearchInput extends React.Component {

    constructor(props) {
        super(props);

        this.searchTimeout = null;
        this.query = '';
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            if (isMobileDevice) {
                // hide keyboard for mobile devices
                event && event.target && event.target.blur && event.target.blur();
            }
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            this.returnSearchData();
        }
    }

    onChange(event) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.query = (event.target.value || '')
            // remove wrong letters
            .replace(/^\s+|\s+$/g, '')
            // remove excessive spaces
            .replace(/ {2,}/g, ' ');

        this.searchTimeout = setTimeout(
            () => {
                this.returnSearchData();
            },
            SEARCH_QUERY_TIMEOUT
        );
    }

    returnSearchData() {
        if (!this.query) {
            return;
        }
        if (this.props.onUpdateSearchInput) {
            this.props.onUpdateSearchInput(new SearchData(this.query));
        }
    }

    render() {
        return (
            <div className="search-input">
                <span>Search: </span>
                <input
                    type="string"
                    defaultValue=""
                    onChange={event => this.onChange(event)}
                    onKeyPress={event => this.onKeyPress(event)}
                />
            </div>
        );
    }
}

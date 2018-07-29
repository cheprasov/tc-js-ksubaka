import React from 'react';

import MovieListItem from './movie-list-item.js';

export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = SearchResult.getInitState(props);
    }

    static getInitState(props) {
        return {
            searchData: props && props.searchData || null,
            page: 0,
            isLoading: false,
            movies: null,
            limit: Infinity,
            error: null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        /** @type {SearchData} props.searchData **/
        /** @type {SearchData} state.searchData **/
        if (props.searchData
            && (state.searchData && props.searchData.getQuery() !== state.searchData.getQuery() || !state.searchData)
        ) {
            return SearchResult.getInitState(props);
        }
        return null;
    }

    loadMovies() {
        if (!this.props.storage) {
            return;
        }
        this.setState(
            (prevState, props) => {
                const state = {
                    isLoading: true,
                };
                if (!Array.isArray(prevState.movies)) {
                    state.movies = [];
                }
                return state;
            },
            () => {
                this.props.storage
                    .getList(this.state.searchData, this.state.page + 1)
                    .then(data => {
                        this.setState((prevState, props) => {
                            const movies = prevState.movies.slice(0);
                            movies.push(...data.items);
                            return {
                                movies,
                                limit: data.limit,
                                isLoading: false,
                                page: prevState.page + 1,
                            };
                        });
                    })
                    .catch(Error => {
                        this.setState({
                            error: Error.message,
                            isLoading: false,
                        });
                    });
            }
        );
    }

    getMovies() {
        if (!Array.isArray(this.state.movies)) {
            return '';
        }
        const movies = [];
        this.state.movies.map(
            (item, index) => {
                movies.push(
                    <MovieListItem key={`movie-${index}`} {...item} />
                );
            }
        );

        return movies;
    }

    componentDidUpdate() {
        if (this.state.movies === null) {
            this.loadMovies();
        }
    }

    isShowMoreAvailable() {
        if (this.state.limit === Infinity) {
            return false;
        }
        if (!Array.isArray(this.state.movies)) {
            return false;
        }

        return this.state.movies.length < this.state.limit;
    }

    render() {
        return (
            <div className="search-result">
                <div className="movie-list">
                    {this.getMovies()}
                    {this.state.isLoading ? <div className="movie-block">Loading...</div> : ''}
                    {this.state.error ? <div className="movie-block error">{this.state.error}</div> : ''}
                    {
                        this.isShowMoreAvailable() && !this.state.isLoading
                            ? <button className="movie-block show-more" onClick={event => this.loadMovies()}>show more ...</button>
                            : ''
                    }
                </div>
            </div>
        );
    }
}

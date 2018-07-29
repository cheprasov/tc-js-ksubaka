import React from 'react';

import { NavLink } from 'react-router-dom';

export default class MovieListItem extends React.Component {
    render() {
        const poster = this.props.Poster && this.props.Poster.toLowerCase() !== 'n/a'
            ? this.props.Poster : 'imgs/no_poster.png';

        return (
            <NavLink target="_blank" className="movie-list-item" to={`/movie/${this.props.imdbID}`}>
                <div className="poster" style={{backgroundImage:`url(${poster})`}} />
                <span className="title">{this.props.Title} <span>({this.props.Year})</span></span>
            </NavLink>
        );
    }
}

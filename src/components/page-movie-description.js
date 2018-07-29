import React from 'react';

import Navigation from './navigation.js';

export default class PageMovieDescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            error: null,
            isLoading: false,
        };
    }

    componentDidMount() {
        if (this.state.movie === null) {
            this.loadMovie();
        }
    }

    loadMovie() {
        if (!this.props.storage) {
            return;
        }
        this.props.storage
            .getMovie(this.props.movieId)
            .then(movie => {
                this.setState({movie});
            })
            .catch(Error => {
                this.setState({
                    error: Error.message,
                });
            });
    }

    getMovie() {
        if (this.state.error !== null) {
            return this.state.error;
        }
        if (this.state.movie === null) {
            return 'Loading...';
        }
        const movie = this.state.movie;
        const isPosterExist = movie.Poster && movie.Poster.toLowerCase() !== 'n/a';

        return (
            <div className="movie-description">
                <h1 className="title">{movie.Title} <span className="year">{movie.Year}</span></h1>
                { isPosterExist ? <img className="poster" src={movie.Poster } /> : '' }
                <div className="description">
                    <div className="row"><span>Type</span><span>{movie.Type || ''}</span></div>
                    <div className="row"><span>Genre</span><span>{movie.Genre || ''}</span></div>
                    <div className="row"><span>Plot</span><span>{movie.Plot || ''}</span></div>
                    <div className="row"><span>Director</span><span>{movie.Director || ''}</span></div>
                    <div className="row"><span>Actors</span><span>{movie.Actors || ''}</span></div>
                    <div className="row"><span>Production</span><span>{movie.Production || ''}</span></div>
                    <div className="row"><span>Awards</span><span>{movie.Awards || ''}</span></div>
                    <div className="row"><span>Rating</span><span>{movie.imdbRating || ''}</span></div>
                    <div className="row"><span>Votes</span><span>{movie.imdbVotes || ''}</span></div>
                </div>
            </div>
        );
    }

    render() {
        const title = this.state.error && 'Error' || this.state.movie && this.state.movie.Title || 'Loading ...';
        return (
            <div>
                <Navigation title={title} />
                {this.getMovie()}
            </div>
        );
    }
}

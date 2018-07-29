import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageMovies from './page-movies.js';
import PageMovieDescription from './page-movie-description.js';

export default class Application extends React.Component {
    render() {
        return (
            <div className="application">
                <Switch>
                    <Route exact path="/" children={() => {
                        return <PageMovies storage={this.props.storage} />
                    }} />
                    <Route exact path="/movie/:movieId" children={({match, ...rest}) => {
                        return <PageMovieDescription movieId={match.params.movieId} storage={this.props.storage} />
                    }} />
                </Switch>
            </div>
        );
    }
}

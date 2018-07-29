import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom'

import Config from "/SRC/config";

import Application from './components/application.js';
import OmdbMovieStorage from "./storages/omdb-movie-storage";
import LocalCache from './cache/local-cache';

const storage = new OmdbMovieStorage(
    Config.omdbapi.url,
    Config.omdbapi.data,
    new LocalCache()
);

ReactDOM.render(
    <Router>
        <Application storage={storage} />
    </Router>
    ,document.getElementById("app-react")
);

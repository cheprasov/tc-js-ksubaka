import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PageMovieDescription from '/SRC/components/page-movie-description.js';
import * as ajax from '/SRC/utils/ajax.js';
import LocalCache from "/SRC/cache/local-cache";
import OmdbMovieStorage from "/SRC/storages/omdb-movie-storage";

const movie = {
    "Title":"No Country for Old Men",
    "Year":"2007",
    "Rated":"R",
    "Released":"21 Nov 2007",
    "Runtime":"122 min",
    "Genre":"Crime, Drama, Thriller",
    "Director":"Ethan Coen, Joel Coen",
    "Writer":"Joel Coen (screenplay), Ethan Coen (screenplay), Cormac McCarthy (novel)",
    "Actors":"Tommy Lee Jones, Javier Bardem, Josh Brolin, Woody Harrelson",
    "Plot":"Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    "Language":"English, Spanish",
    "Country":"USA",
    "Awards":"Won 4 Oscars. Another 157 wins & 132 nominations.",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
    "Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"91/100"}],
    "Metascore":"91",
    "imdbRating":"8.1",
    "imdbVotes":"719,981",
    "imdbID":"tt0477348",
    "Type":"movie",
    "DVD":"07 Apr 2009",
    "BoxOffice":"$74,223,625",
    "Production":"Miramax Films",
    "Website":"http://www.nocountryforoldmen-themovie.com",
    "Response":"True"
};

test('Movie description is loaded', (done) => {

    ajax.httpGet = () => {
        throw new Error('It should be used cache');
    };

    const cache = new LocalCache();
    cache.set('movie:42', movie);
    const storage = new OmdbMovieStorage('http://foo.bar/', {}, cache);

    const wrapper = mount(
        <MemoryRouter initialEntries={['/movie/42']} initialIndex={0}>
            <PageMovieDescription movieId="42" storage={storage} />
        </MemoryRouter>
    );

    const subComponent = (title, key = title) => {
        return (<div className="row"><span>{title}</span><span>{movie[key]}</span></div>);
    };

    setTimeout(() => {
        try {
            wrapper.update();

            expect(wrapper.contains(
                <h1 className="title">{movie.Title} <span className="year">{movie.Year}</span></h1>
            )).toBe(true);
            expect(wrapper.contains(
                <img className="poster" src={movie.Poster} />
            )).toBe(true);

            expect(wrapper.contains(subComponent('Type'))).toEqual(true);
            expect(wrapper.contains(subComponent('Genre'))).toBe(true);
            expect(wrapper.contains(subComponent('Plot'))).toBe(true);
            expect(wrapper.contains(subComponent('Director'))).toBe(true);
            expect(wrapper.contains(subComponent('Actors'))).toBe(true);
            expect(wrapper.contains(subComponent('Production'))).toBe(true);
            expect(wrapper.contains(subComponent('Awards'))).toBe(true);
            expect(wrapper.contains(subComponent('Rating', 'imdbRating'))).toBe(true);
            expect(wrapper.contains(subComponent('Votes', 'imdbVotes'))).toBe(true);

            done();
        } catch (e) {
            done.fail(e);
        }
    }, 0);

});

test('Error message', (done) => {

    ajax.httpGet = () => {
        return new Promise(((resolve, reject) => reject(new Error("Foo Bar Error"))))
    };

    const storage = new OmdbMovieStorage('http://foo.bar/');

    const wrapper = mount(
        <MemoryRouter initialEntries={['/movie/42']} initialIndex={0}>
            <PageMovieDescription movieId="42" storage={storage} />
        </MemoryRouter>
    );

    setTimeout(() => {
        try {
            wrapper.update();

            expect(wrapper.contains(<span className="title">Error</span>)).toBe(true);
            expect(wrapper.contains('Foo Bar Error')).toBe(true);

            done();
        } catch (e) {
            done.fail(e);
        }
    }, 0);

});

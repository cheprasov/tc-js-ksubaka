import React from 'react';
import MovieListItem from '/SRC/components/movie-list-item.js';
import { shallow } from 'enzyme';

import { NavLink } from 'react-router-dom'

test('Movie without poster', () => {

    const wrapper = shallow(
        <MovieListItem imdbID="tt42" Title="Foo Bar" Year="2018" />
    );

    expect(wrapper.equals(
        <NavLink target="_blank" className="movie-list-item" to="/movie/tt42">
            <div className="poster" style={{backgroundImage: "url(imgs/no_poster.png)"}} />
            <span className="title">Foo Bar <span>(2018)</span></span>
        </NavLink>
    )).toEqual(true);

});

test('Movie with poster', () => {

    const wrapper = shallow(
        <MovieListItem imdbID="ii1010" Title="Movie Title" Year="2010" Poster="some-image.png" />
    );

    expect(wrapper.equals(
        <NavLink target="_blank" className="movie-list-item" to="/movie/ii1010">
            <div className="poster" style={{backgroundImage: "url(some-image.png)"}} />
            <span className="title">Movie Title <span>(2010)</span></span>
        </NavLink>
    )).toEqual(true);

});

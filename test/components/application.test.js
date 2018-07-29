import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Application from '/SRC/components/application.js';
import PageMovies from '/SRC/components/page-movies.js';
import PageMovieDescription from '/SRC/components/page-movie-description.js';

test('Search page', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Application />
        </MemoryRouter>
    );

    expect(wrapper.contains(<Application />)).toEqual(true);
    expect(wrapper.contains(<PageMovies />)).toEqual(true);
    expect(wrapper.contains(<PageMovieDescription />)).toEqual(false);

});

test('Movie page', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={['/movie/tt42']} initialIndex={0}>
            <Application />
        </MemoryRouter>
    );

    expect(wrapper.contains(<Application />)).toEqual(true);
    expect(wrapper.contains(<PageMovies />)).toEqual(false);
    expect(wrapper.contains(<PageMovieDescription movieId="tt42" />)).toEqual(true);

});

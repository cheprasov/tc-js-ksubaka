import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PageMovies from '/SRC/components/page-movies.js';
import SearchInput from '/SRC/components/search-input.js';
import SearchResult from '/SRC/components/search-result.js';
import Navigation from '/SRC/components/navigation.js';

test('Check page structure', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <PageMovies />
        </MemoryRouter>
    );

    expect(wrapper.containsMatchingElement(<PageMovies />)).toBe(true);
    expect(wrapper.containsMatchingElement(<Navigation />)).toBe(true);
    expect(wrapper.containsMatchingElement(<SearchInput />)).toBe(true);
    expect(wrapper.containsMatchingElement(<SearchResult />)).toBe(true);

});

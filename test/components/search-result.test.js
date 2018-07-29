import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import * as ajax from '/SRC/utils/ajax.js';
import LocalCache from "/SRC/cache/local-cache";
import OmdbMovieStorage from '/SRC/storages/omdb-movie-storage.js';
import SearchData from '/SRC/dto/search-data.js';
import SearchResult from '/SRC/components/search-result.js';
import MovieListItem from '/SRC/components/movie-list-item.js';

const movies = {
    page1: {
        items: [
            {
                "Title": "No Country for Old Men",
                "Year": "2007",
                "imdbID": "tt0477348",
                "Type": "movie",
                "Poster": "https://aaa.jpg"
            },
            {
                "Title": "Men in Black",
                "Year": "1997",
                "imdbID": "tt0119654",
                "Type": "movie",
                "Poster": "https://bbb.jpg"
            },
        ],
        limit: 3,
    },
    page2: {
        items: [
            {
                "Title": "X-Men: The Last Stand",
                "Year": "2006",
                "imdbID": "tt0376994",
                "Type": "movie",
                "Poster": "N/A"
            },
        ],
        limit: 3,
    },
};

test('Loading of list & pages', (done) => {

    ajax.httpGet = () => {
        throw new Error('It should be used cache');
    };

    const cache = new LocalCache();
    cache.set('movies:1:men', movies.page1);
    cache.set('movies:2:men', movies.page2);
    const storage = new OmdbMovieStorage('http://foo.bar/', {}, cache);

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <SearchResult searchData={new SearchData('men')} storage={storage} />
        </MemoryRouter>
    );

    expect(wrapper.find('.movie-list').children().length).toBe(0);

    const searchResultWrapper = wrapper.find(SearchResult);
    expect(searchResultWrapper.exists()).toBe(true);

    searchResultWrapper.instance().loadMovies();

    // page 1 test
    setTimeout(() => {
        try {
            wrapper.update();

            expect(wrapper.find('.movie-list').children().length).toBe(3);
            expect(wrapper.contains(<MovieListItem {...movies.page1.items[0]} />)).toBe(true);
            expect(wrapper.contains(<MovieListItem {...movies.page1.items[1]} />)).toBe(true);
            expect(wrapper.contains(<MovieListItem {...movies.page2.items[0]} />)).toBe(false);
            expect(wrapper.containsMatchingElement(<button>show more ...</button>)).toBe(true);

            searchResultWrapper.instance().loadMovies();

            // page 2 test
            setTimeout(() => {
                try {
                    wrapper.update();

                    expect(wrapper.find('.movie-list').children().length).toBe(3);
                    expect(wrapper.contains(<MovieListItem {...movies.page1.items[0]} />)).toBe(true);
                    expect(wrapper.contains(<MovieListItem {...movies.page1.items[1]} />)).toBe(true);
                    expect(wrapper.contains(<MovieListItem {...movies.page2.items[2]} />)).toBe(false);
                    expect(wrapper.containsMatchingElement(<button>show more ...</button>)).toBe(false);

                    done();
                } catch (e) {
                    done.fail(e);
                }
            }, 0);

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
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <SearchResult searchData={new SearchData('men')} storage={storage} />
        </MemoryRouter>
    );

    const searchResultWrapper = wrapper.find(SearchResult);
    expect(searchResultWrapper.exists()).toBe(true);
    searchResultWrapper.instance().loadMovies();

    setTimeout(() => {
        try {
            wrapper.update();

            expect(wrapper.containsMatchingElement(<div>Foo Bar Error</div>)).toBe(true);

            done();
        } catch (e) {
            done.fail(e);
        }
    }, 0);

});

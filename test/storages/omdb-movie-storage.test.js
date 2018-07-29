import StorageInterface from '/SRC/storages/storage-interface.js';
import OmdbMovieStorage from '/SRC/storages/omdb-movie-storage.js';
import LocalCache from '/SRC/cache/local-cache.js';
import SearchData from '/SRC/dto/search-data';
import * as ajax from '/SRC/utils/ajax.js';

const responses = {
    getList: {
        "Search": [
            {
                "Title": "No Country for Old Men",
                "Year": "2007",
                "imdbID": "tt0477348",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg"
            },
            {
                "Title": "Men in Black",
                "Year": "1997",
                "imdbID": "tt0119654",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOTlhYTVkMDktYzIyNC00NzlkLTlmN2ItOGEyMWQ4OTA2NDdmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
            {
                "Title": "X-Men: The Last Stand",
                "Year": "2006",
                "imdbID": "tt0376994",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjI1NTg2ODA2Nl5BMl5BanBnXkFtZTcwMDc2MjEzMw@@._V1_SX300.jpg"
            }
        ],
        "totalResults": "2906",
        "Response": "True",
    },
    getMovie: {
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
    }
};

test('Creating new instance', () => {

    const storage = new OmdbMovieStorage('http://foo.bar/');
    expect(storage).toBeInstanceOf(StorageInterface);

});

test('Getting correct result for getList', () => {

    ajax.httpGet = (url, data) => {
        expect(url).toEqual('http://foo.bar/');
        expect(data).toEqual({s: 'foo bar', page: 1, apikey: 123});
        return new Promise(resolve => resolve(responses.getList));
    };

    const searchData = new SearchData('foo bar');

    const storage = new OmdbMovieStorage('http://foo.bar/', {apikey: 123});
    storage.getList(searchData, 1).then(result => {
        expect(result).toEqual({items: responses.getList.Search, limit: 2906})
    });

});

test('Getting cached result for getList', () => {

    ajax.httpGet = () => {
        throw new Error('It should be used cache');
    };

    const searchData = new SearchData('foo bar');
    const cache = new LocalCache();

    cache.set(`movies:1:${searchData.getHash()}`, {foo1: 'bar1'});
    cache.set(`movies:2:${searchData.getHash()}`, {foo2: 'bar2'});

    const storage = new OmdbMovieStorage('http://foo.bar/', {}, cache);
    storage.getList(searchData, 1).then(result => {
        expect(result).toEqual({foo1: 'bar1'})
    });
    storage.getList(searchData, 2).then(result => {
        expect(result).toEqual({foo2: 'bar2'})
    });

});

test('Getting correct result for getMovie', () => {

    ajax.httpGet = (url, data) => {
        expect(url).toEqual('http://foo.bar/');
        expect(data).toEqual({i: 42, apikey: 123});
        return new Promise(resolve => resolve(responses.getMovie));
    };

    const storage = new OmdbMovieStorage('http://foo.bar/', {apikey: 123});
    storage.getMovie(42).then(result => {
        expect(result).toEqual(responses.getMovie)
    });

});

test('Getting cached result for getMovie', () => {

    ajax.httpGet = () => {
        throw new Error('It should be used cache');
    };

    const cache = new LocalCache();

    cache.set('movie:42', {'movie': 'foo'});
    cache.set('movie:43', {'movie': 'bar'});

    const storage = new OmdbMovieStorage('http://foo.bar/', {}, cache);
    storage.getMovie(42).then(result => {
        expect(result).toEqual({'movie': 'foo'})
    });
    storage.getMovie(43).then(result => {
        expect(result).toEqual({'movie': 'bar'})
    });

});

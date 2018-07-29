import SearchData from '/SRC/dto/search-data.js';

test('Creating new instance and getting data', () => {

    const searchDataFoo = new SearchData('foo');
    expect(searchDataFoo.getQuery()).toEqual('foo');
    expect(searchDataFoo.getData()).toEqual({query: 'foo'});

    const searchDataBar = new SearchData('bar');
    expect(searchDataBar.getQuery()).toEqual('bar');
    expect(searchDataBar.getData()).toEqual({query: 'bar'});
    expect(searchDataBar.getHash()).toEqual('bar');

});

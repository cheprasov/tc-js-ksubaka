import LocalCache from '/SRC/cache/local-cache.js';
import CacheInterface from '/SRC/cache/cache-interface';

test('Creating new instance', () => {

    const localCache = new LocalCache();
    expect(localCache).toBeInstanceOf(CacheInterface);

});

test('Checking set & get', () => {

    const cache1 = new LocalCache();
    const cache2 = new LocalCache();

    expect(cache1.get('foo')).toEqual(undefined);
    expect(cache2.get('foo')).toEqual(undefined);

    cache1.set('foo', 'bar');
    expect(cache1.get('foo')).toEqual('bar');
    expect(cache2.get('foo')).toEqual('bar');

    cache2.set('foo', {bar: 42});
    expect(cache1.get('foo')).toEqual({bar: 42});
    expect(cache2.get('foo')).toEqual({bar: 42});

    cache2.set('foo', false);
    expect(cache1.get('foo')).toEqual(false);
    expect(cache2.get('foo')).toEqual(false);

});

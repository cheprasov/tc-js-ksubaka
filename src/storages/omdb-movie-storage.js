import StorageInterface from './storage-interface.js';
import CacheInterface from '/SRC/cache/cache-interface.js';

import { httpGet } from '/SRC/utils/ajax.js';

export default class OmdbMovieStorage extends StorageInterface {

    /**
     * @param {string} url
     * @param {object} data
     * @param {CacheInterface|null} cache
     */
    constructor(url, data = {}, cache = null) {
        super();
        this.url = url;
        this.data = data;
        /** @type {CacheInterface|null} this.cache **/
        this.cache = cache instanceof CacheInterface ? cache : null;
    }

    /**
     * @inheritDoc
     */
    getList(searchData, page) {
        const key = `movies:${page}:${searchData.getHash()}`;

        if (this.cache) {
            const cacheData = this.cache.get(key);
            if (cacheData) {
                return new Promise(resolve => resolve(cacheData));
            }
        }

        const data = {
            s: searchData.getQuery(),
            page: page,
            ...this.data
        };

        return httpGet(this.url, data).then((obj) => {
            if (obj && obj.Response === 'True') {
                if (Array.isArray(obj.Search)) {
                    const data = {
                        items: obj.Search,
                        limit: parseInt(obj.totalResults, 10)
                    };
                    if (this.cache) {
                        this.cache.set(key, data);
                    }
                    return data;
                }
                throw new Error('Empty response');
            }
            throw new Error(obj && obj.Error || 'Cant load data');
        });
    }

    /**
     * @inheritDoc
     */
    getMovie(id) {
        const key = `movie:${id}`;

        if (this.cache) {
            const cacheData = this.cache.get(key);
            if (cacheData) {
                return new Promise(resolve => resolve(cacheData));
            }
        }

        const data = {
            i: id,
            ...this.data
        };

        return httpGet(this.url, data).then((obj) => {
            if (obj && obj.Response === 'True') {
                if (this.cache) {
                    this.cache.set(key, obj);
                }
                return obj;
            }
            throw new Error(obj && obj.Error || 'Cant load data');
        });
    }
}

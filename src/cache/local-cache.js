import CacheInterface from './cache-interface.js';

const cache = {};

export default class LocalCache extends CacheInterface {

    /**
     * @inheritDoc
     */
    get(key) {
        return cache[key];
    }

    /**
     * @inheritDoc
     */
    set(key, data) {
        cache[key] = data;
    }
}

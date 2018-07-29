
export default class CacheInterface {

    /**
     * @param {string} key
     * @return {*}
     */
    get(key) {
        throw new Error('Method "get" should be overwritten');
    }

    /**
     * @param {string} key
     * @param {*} data
     */
    set(key, data) {
        throw new Error('Method "get" should be overwritten');
    }
}

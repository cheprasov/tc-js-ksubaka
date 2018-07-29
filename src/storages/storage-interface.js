export default class StorageInterface {

    /**
     * @param {SearchData} searchData
     * @param {number} page
     * @return {Promise}
     */
    getList(searchData, page) {
        throw new Error('Method "getList" should be overwritten');
    }

    /**
     * @param {string} id
     */
    getMovie(id) {
        throw new Error('Method "getMovie" should be overwritten');
    }
}

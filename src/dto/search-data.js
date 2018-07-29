
export default class SearchData {

    /**
     * @param {string} query
     */
    constructor(query) {
        this.data = {
            query
        };
    }

    /**
     * @return {{query: string}}
     */
    getData() {
        return this.data;
    }

    /**
     * @return {string}
     */
    getQuery() {
        return this.data.query;
    }

    /**
     * @return {string}
     */
    getHash() {
        return this.data.query;
    }
}

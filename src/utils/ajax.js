/**
 * @param {string} url
 * @param {object} data
 * @return {Promise<any>}
 */
export function httpGet(url, data = {}) {
    return new Promise(function(resolve, reject) {

        let newUrl = url;
        if (newUrl.indexOf('?') === -1) {
            newUrl += '?';
        }

        for (const k in data) {
            if (!data.hasOwnProperty(k)) {
                continue;
            }
            newUrl += `&${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', newUrl, true);

        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const data = JSON.parse(this.responseText);
                    return resolve(data);
                } catch (err) {
                    return reject(this.responseText);
                }
            } else {
                return reject(`${this.status} ${this.statusText}`);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

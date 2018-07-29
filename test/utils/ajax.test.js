import { httpGet } from '/SRC/utils/ajax.js';

describe('httpGet test', function() {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR = null;

    beforeEach(() => {
        mockXHR = {
            open: jest.fn(),
            send: jest.fn(),
            onload: jest.fn(),
            status: 200,
            responseText: "{}"
        };
        window.XMLHttpRequest = jest.fn(() => mockXHR);
    });

    afterEach(() => {
        window.XMLHttpRequest = oldXMLHttpRequest;
    });

    test('Check url & query', () => {
        mockXHR.open = (method, url, async) => {
            expect(method).toEqual('GET');
            expect(async).toEqual(true);

            const parts = url.split('&');
            expect(parts.length).toEqual(5);

            expect(parts.shift()).toEqual('https://foo.bar/?');
            parts.sort();
            expect(parts[0]).toEqual('amp=%26');
            expect(parts[1]).toEqual('apikey=123-456-789');
            expect(parts[2]).toEqual('equal=%3D');
            expect(parts[3]).toEqual('s=hello%20world');
        };

        const data = {
            s: 'hello world',
            apikey: '123-456-789',
            equal: '=',
            amp: '&',
        };
        httpGet('https://foo.bar/', data);
        mockXHR.onload();
    });

    test('Function should return response', done => {
        const response = [
            {title: 'foo'},
            {title: 'bar'}
        ];

        httpGet('https://foo.bar/')
            .then((resp) => {
                expect(resp).toEqual(response);
                done();
            });

        mockXHR.responseText = JSON.stringify(response);
        mockXHR.onload();
    });
});

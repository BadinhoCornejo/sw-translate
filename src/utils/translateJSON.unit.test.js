const { translate, translateSingleObject } = require('./translateJSON');

const endpoints = [
    'planets',
    'planets/1',
    'planets/2',
    'people',
    'people/1',
    'people/2',
];

describe('translateJSON tests', () => {
    it('should be a function', () => {
        expect(typeof translate).toBe('function');
    });

    it('should return null on empty data', async () => {
        const [result] = await translate('test');
        expect(result).toBe(null);
    });

    it('should translate object', async () => {
        const result = await translateSingleObject({ name: 'test' });
        const key = Object.keys(result)[0];
        expect(key).toBe('nombre');
    });

    it('should allow only an object', async () => {
        const result = await translateSingleObject('test');
        expect(JSON.stringify(result)).toBe("{}");
    });
});
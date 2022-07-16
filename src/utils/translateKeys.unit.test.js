const { translateKeys } = require('./translateKeys');

describe('translateKeys tests', () => {
    it('should be a function', () => {
        expect(typeof translateKeys).toBe('function');
    });

    it('should allow only objects', async () => {
        const result = await translateKeys('test');
        expect(result).toBe(null);
    });

    it('should translate keys', async () => {
        const result = await translateKeys({ name: 'test' });
        expect(result[0].newKey).toBe('nombre');
        expect(result[0].oldKey).toBe('name');
    });
});
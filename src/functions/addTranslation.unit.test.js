const { translate } = require('./addTranslation');

describe('addTranslation handler', () => {
    it('should be a function', () => {
        expect(typeof translate).toBe('function');
    });

    it('should throw an error on empty request', async () => {
        try {
            await translate();
        } catch (error) {
            expect(error.status).toBe(400);
            expect(typeof error.message).toBe('string');
        }
    });

    it('should throw an error on empty body', async () => {
        try {
            await translate({});
        } catch (error) {
            expect(error.status).toBe(400);
            expect(typeof error.message).toBe('string');
        }
    });
});


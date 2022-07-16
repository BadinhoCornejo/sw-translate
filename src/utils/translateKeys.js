const translator = require('translate');
const API_KEY = process.env.GOOGLE_API_KEY;

translator.engine = 'google';
translator.key = API_KEY;

const translateKeys = async (object) => {
    if(typeof object !== 'object') return null;

    const keys = [];

    for (i in object) {
        const translation = await translator(i, 'es');
        keys.push({ newKey: translation, oldKey: i });
    }

    return keys;
};

module.exports = {
    translateKeys
};
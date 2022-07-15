const translator = require('translate');
const API_KEY = 'AIzaSyAvFPO0xnHshYQy_mra-LBEb4x7R7VSKRc';

translator.engine = 'google';
translator.key = API_KEY;

const translateKeys = async (object) => {
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
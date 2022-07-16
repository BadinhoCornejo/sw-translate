const axios = require('axios');
const { translateKeys: getNewKeys } = require('./translateKeys');

const baseURL = 'https://swapi.py4e.com/api'

const translateSingleObject = async (object) => {
    const obj = {};
    const newKeys = await getNewKeys(object);

    if(!newKeys) return obj;

    newKeys.forEach(v => {
        const { newKey, oldKey } = v;
        obj[newKey] = object[oldKey];
    });

    return obj;
}


const translate = async (endpoint) => {
    try {
        const res = await axios.get(`${baseURL}/${endpoint}`);
        const object = res.data;

        if (!object) return [null, 'No data'];

        if (object.results) {
            const { results, ...data } = object;

            const output = await Promise.all(results.map(async i =>
                await translateSingleObject(i)
            ));

            const newData = await translateSingleObject(data);

            return [{ ...newData, resultados: output }, null];
        }

        const output = await translateSingleObject(object);

        return [output, null];
    } catch (error) {
        return [null, JSON.stringify(error)];
    }
}

module.exports = {
    translate,
    translateSingleObject
};
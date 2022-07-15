const axios = require('axios');
const { translateKeys: getNewKeys } = require('./translateKeys');

const baseURL = 'https://swapi.py4e.com/api'
const endpoints = [
    'planets',
    'planets/1',
    'planets/2',
    'people',
    'people/1',
    'people/2',
];

const translateSingleObject = async (object) => {
    const obj = {};
    const newKeys = await getNewKeys(object);

    newKeys.forEach(v => {
        const { newKey, oldKey } = v;
        obj[newKey] = object[oldKey];
    });

    return obj;
}


const translate = async (endpoint) => {
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
}

module.exports = {
    translate
};
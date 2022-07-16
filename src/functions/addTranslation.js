const { v4 } = require('uuid');
const Dynamo = require('../common/dynamo');

const translate = async (event) => {
    try {
        const { endpoint } = JSON.parse(event.body);
        const createdAt = (new Date()).toISOString();
        const id = v4();
        const data = {
            id,
            endpoint,
            createdAt
        };

        await Dynamo.write(data, 'SW_Translation');

        return { status: 200, body: { id } };
    } catch (error) {
        console.error(error);
        return { status: 400, message: JSON.stringify(error) };
    }
};

module.exports = {
    translate,
};
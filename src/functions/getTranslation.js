const Dynamo = require('../common/dynamo');
const translator = require('../utils/translateJSON');

const translate = async (event) => {
    try {
        const { id } = event.pathParameters;
        const data = await Dynamo.get(id, 'SW_Translation');

        const [translation, error] = await translator.translate(data.endpoint);

        if (error) return { status: 400, message: error };

        return { status: 200, body: { data: translation } };
    } catch (error) {
        console.error(error);
        return { status: 400, message: JSON.stringify(error) };
    }
};

module.exports = {
    translate,
};

const AWS = require('aws-sdk');
const translator = require('../utils/translateJSON');

const translate = async (event) => {
    try {
        const { id } = event.pathParameters;
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.get({
            TableName: 'SW_Translation',
            Key: { id }
        }).promise()

        const data = result.Item;

        if (!data) return { status: 404,  message: 'Not Found' };

        const [translation, error] = await translator.translate(data.endpoint);

        if (error) return { status: 400, message: error };

        return { status: 200, body: { data: translation } };
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    translate,
};

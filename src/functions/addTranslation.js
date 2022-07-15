const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const translate = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { endpoint } = JSON.parse(event.body);
    const createdAt = (new Date()).toISOString();
    const id = v4();
    const data = {
        id,
        endpoint,
        createdAt
    };

    await dynamodb.put({
        TableName: 'SW_Translation',
        Item: data,
    }).promise();

    return { status: 200, body: { id } };
};

module.exports = {
    translate,
};
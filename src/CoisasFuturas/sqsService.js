// sqsService.js

const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1' // Substitua pela sua região
});

const sqs = new AWS.SQS();
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/your-account-id/your-queue-name';

const sendMessage = (messageBody) => {
    const params = {
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueUrl
    };

    return new Promise((resolve, reject) => {
        sqs.sendMessage(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const receiveMessages = () => {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 10
    };

    return new Promise((resolve, reject) => {
        sqs.receiveMessage(params, (err, data) => {
            if (err) reject(err);
            else resolve(data.Messages || []);
        });
    });
};

module.exports = {
    sendMessage,
    receiveMessages
};

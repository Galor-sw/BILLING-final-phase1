const amqp = require('amqplib/callback_api');
const IAMMessageCreateFreePlan = process.env.GET_MESSAGE_FROM_IAM_CREATE_FREE_PLAN;
const IAMMessageStatusAccount = process.env.GET_MESSAGE_FROM_IAM_ACCOUNT_STATUS_CHANGED;
const serverLogger = require(`../logger`);
const logger = serverLogger.log;

const listenQueue = () => {
    logger.info(`listening to IAM queues`);
    amqp.connect(IAMMessageCreateFreePlan, (err, conn) => {
        conn.createChannel((err, ch) => {
            const q = 'CloudAMQP';
            ch.consume(q, (msg) => {
                const jsonMessage = (JSON.parse(msg.content.toString()));
                logger.info(`message from IAM - set free plan to: ${jsonMessage.accountId}`);
            }, {noAck: true});
        })
    })


    amqp.connect(IAMMessageStatusAccount, (err, conn) => {
        conn.createChannel((err, ch) => {
            const q = 'CloudAMQP';
            ch.consume(q, (msg) => {
                const jsonMessage = (JSON.parse(msg.content.toString()));
                logger.info(`message from IAM - ${jsonMessage.status} account: ${jsonMessage.accountId}`);
            }, {noAck: true});
        })
    })
}

module.exports = listenQueue;
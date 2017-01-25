
module.exports = {
    required: {
        port: {
            description: 'the spiped-encrypted port',
            default: 6444,
        }
    },
    default: {
        logging: 'info'
    },
    development: {
        logging: 'debug'
    },
};

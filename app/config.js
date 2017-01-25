
module.exports = {
    required: {
        encryptPort: {
            description: 'the spiped encrypt port',
            default: 6444,
        }
    },
    default: {
        logging: 'info',
        host: 'localhost',
        port: 6379
    },
    development: {
        logging: 'debug'
    },
};

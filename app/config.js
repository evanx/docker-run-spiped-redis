
module.exports = {
    required: {
        port: {
            description: 'the spiped-encrypted port',
            default: 6444,
        },
        key: {
            description: 'the spiped key in base64'
        }
    },
    default: {
        logging: 'info'
    },
    development: {
        logging: 'debug'
    },
};

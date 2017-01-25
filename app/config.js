
module.exports = {
    required: {
        pattern: {
            description: 'the matching pattern for Redis scan',
            example: '*'
        },
        limit: {
            default: 30,
            description: 'the maximum number of keys to print',
            note: 'zero means unlimited'
        },
        port: {
            default: 6379,
            description: 'the Redis host port'
        },
        host: {
            default: 'localhost',
            description: 'the Redis host address'
        },
        password: {
            required: false,
            description: 'the Redis host password'
        },
        logging: {
            default: 'info',
            description: 'the logging level'
        },
    },
    development: {
        logging: 'debug'
    },
};

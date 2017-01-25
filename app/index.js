
const clc = require('cli-color');
const mkdirp = require('mkdirp');
const Docker = require('dockerode');
require('../components/redisCliApp')(require('./config')).then(main);

async function main(context) {
    Object.assign(global, context);
    logger.level = config.logging;
    logger.debug('main', config);
    try {
        mkdirp('tmp');
        const docker = new Docker();
        logger.debug('1');
        const output = await docker.listContainers({all: true}, (err, containers) => {
            logger.debug({err, containers});
        });
        logger.debug({output});
    } catch (err) {
        console.error(err);
    } finally {
        end();
    }
}

async function end() {
    logger.info('end');
    client.quit();
}

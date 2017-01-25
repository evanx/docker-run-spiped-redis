
const clc = require('cli-color');
const mkdirp = require('mkdirp');
const Docker = require('dockerode-promise');
require('../components/redisCliApp')(require('./config')).then(main);

async function main(context) {
    Object.assign(global, context);
    logger.level = config.logging;
    logger.debug('main', config);
    try {
        mkdirp('tmp');
        const docker = new Docker();
        logger.debug('1');
        const output = await docker.listContainers();
        logger.debug({output});
    } catch (err) {
        console.error(err);
    } finally {
        end();
    }
}

async function end() {
    client.quit();
}

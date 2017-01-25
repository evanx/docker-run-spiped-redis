
const clc = require('cli-color');
const mkdirp = require('mkdirp');
const Docker = require('dockerode-promise');
require('../components/redisCliApp')(require('./config')).then(main);

async function main(context) {
    Object.assign(global, context);
    logger.level = config.logging;
    logger.debug('main', config);
    try {
        mkdirp('tmp1');
        const docker = new Docker();
        const output = await docker.listContainers();
        logger.debug(output);
    } catch (err) {
        console.error(err);
    } finally {
        end();
    }
}

async function end() {
    client.quit();
}


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
        const containers = await docker.listContainers({all: false});
        logger.debug(`${containers.length}`, containers.map(container => {
            return container.Names[0];
        }));
        const networks = await docker.listNetworks();
        logger.debug(`${networks.length}`, networks.map(network => {
            return network.Name;
        }));
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

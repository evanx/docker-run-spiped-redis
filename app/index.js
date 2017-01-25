
const clc = require('cli-color');
require('../components/redisCliApp')(require('./config')).then(main);

async function main(context) {
    Object.assign(global, context);
    logger.level = config.logging;
    logger.debug('main', config);
    let count = 0;
    try {
        let cursor;
        while (true) {
            const [result] = await multiExecAsync(client, multi => {
                multi.scan(cursor || 0, 'match', config.pattern);
            });
            cursor = parseInt(result[0]);
            const keys = result[1];
            const types = await multiExecAsync(client, multi => {
                keys.forEach(key => multi.type(key));
            });
            const hashesKeys = keys.filter((key, index) => types[index] === 'hash');
            if (hashesKeys.length) {
                count += hashesKeys.length;
                const results = await multiExecAsync(client, multi => {
                    hashesKeys.forEach(key => multi.hkeys(key));
                });
                hashesKeys.forEach((key, index) => {
                    const result = results[index];
                    console.log(`${clc.cyan(key)} ${result.join(' ')}`);
                });
                if (config.limit > 0 && count > config.limit) {
                    console.error(clc.yellow('Limit exceeded. Try: limit=0'));
                    break;
                }
            }
            if (cursor === 0) {
                break;
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        end();
    }
}

async function end() {
    client.quit();
}

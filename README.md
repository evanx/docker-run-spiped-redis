# docker-run-spiped-redis

Utility to shell out Docker commands to run a test Redis instance with an encrypted connection via spiped.

<img src='https://raw.githubusercontent.com/evanx/docker-run-spiped-redis/master/docs/readme/images/options.png'>


## Config

See `app/config.js`
```javascript
    encryptPort: {
        description: 'the spiped encrypt port',
        default: 6444
    }
```

## Implementation

See `app/index.js`
```javascript
```

## Development

For development, you can run as follows:
```
git clone https://github.com/evanx/docker-run-spiped-redis.git
cat package.json
npm install
npm start
```

## Docker

```shell
docker build -t docker-run-spiped-redis https://github.com/evanx/docker-run-spiped-redis.git
```
where tagged as image `docker-run-spiped-redis`

```shell
docker run --network=host -e pattern='*' docker-run-spiped-redis
```
where `--network-host` connects the container to your `localhost` bridge. The default Redis host `localhost` works in that case.

Since the containerized app has access to the host's Redis instance, you should inspect the source.

see `Dockerfile`

```
FROM node:7.4.0
ADD package.json .
RUN npm install
ADD components components
ADD app app
ENV NODE_ENV production
CMD ["node", "--harmony", "app/index.js"]
```

### Demo script

See scripts/demo.sh
```shell
```

https://twitter.com/@evanxsummers

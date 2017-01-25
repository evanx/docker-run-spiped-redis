(
  set -u -e -x
  docker network create -d bridge test-hkeys-network
  container=`docker run --network=test-hkeys-network \
    --name test-redis-hkeys -d tutum/redis`
  password=`docker logs $container | grep '^\s*redis-cli -a' |
    sed -e 's/^\s*redis-cli -a \(\w*\) .*$/\1/'`
  redisHost=`docker inspect $container |
    grep '"IPAddress":' | tail -1 | sed 's/.*"\([0-9\.]*\)",/\1/'`
  redis-cli -a $password -h $redisHost hset mytest:64:h name 'Pottery Place'
  redis-cli -a $password -h $redisHost hset mytest:64:h address '48 High Street'
  docker run --network=test-hkeys-network \
    -e host=$redisHost -e password=$password \
    -e pattern=mytest:*:h evanxsummers/scan-hkeys
  docker rm -f `docker ps -q -f name=test-redis-hkeys`
  docker network rm test-hkeys-network
)

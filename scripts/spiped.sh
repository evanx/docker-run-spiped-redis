(
  set -u -e -x
  mkdir -p tmp
  docker network create -d bridge test-hkeys-network
  redisContainer=`docker run --network=test-hkeys-network \
      --name test-hkeys-redis -d tutum/redis`
  password=`docker logs $redisContainer | grep '^\s*redis-cli -a' |
      sed -e 's/^\s*redis-cli -a \(\w*\) .*$/\1/'`
  redisHost=`docker inspect $redisContainer |
      grep '"IPAddress":' | tail -1 | sed 's/.*"\([0-9\.]*\)",/\1/'`
  dd if=/dev/urandom bs=32 count=1 > $HOME/tmp/test-spiped-keyfile
  decipherContainer=`docker run --network=test-hkeys-network \
    --name test-decipher -v $HOME/tmp/test-spiped-keyfile:/spiped/key:ro \
    -p 6444:6444 -d spiped \
    -d -s "[0.0.0.0]:6444" -t "[$redisHost]:6379"`
  decipherHost=`docker inspect $decipherContainer |
    grep '"IPAddress":' | tail -1 | sed 's/.*"\([0-9\.]*\)",/\1/'`
  encipherContainer=`docker run --network=test-hkeys-network \
    --name test-encipher -v $HOME/tmp/test-spiped-keyfile:/spiped/key:ro \
    -p 6333:6333 -d spiped \
    -e -s "[0.0.0.0]:6333" -t "[$decipherHost]:6444"`
  encipherHost=`docker inspect $encipherContainer |
    grep '"IPAddress":' | tail -1 | sed 's/.*"\([0-9\.]*\)",/\1/'`
  redis-cli -a $password -h $encipherHost -p 6333 hset mytest:64:h name 'Pottery Place'
  redis-cli -a $password -h $encipherHost -p 6333 hset mytest:64:h address '48 High Street'
  docker run --network=test-hkeys-network --name test-hkeys-app \
    -e host=$encipherHost -e port=6333 -e password=$password \
    -e pattern=mytest:*:h evanxsummers/scan-hkeys
  docker rm -f test-hkeys-redis test-hkeys-app test-decipher test-encipher
  docker network rm test-hkeys-network
)

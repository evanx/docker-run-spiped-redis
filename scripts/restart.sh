
  mkdir -p tmp
  cp app/*js tmp/.
  redis-cli del restart:adv
  node --harmony tmp/index.js
  while true
  do
    name=`redis-cli brpop restart:adv 10`
    if [ -n "$name"]
    then
      echo "$name"
      date +%T
      head tmp/index.js
      node -v
      node --harmony tmp/index.js
    fi
  done

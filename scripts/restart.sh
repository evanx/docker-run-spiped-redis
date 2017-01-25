
  mkdir -p tmp
  cp app/*js tmp/.
  while true
  do
    name=`redis-cli brpop restart:adv 10`
    if [ -n "$name"]
    then
      date +%T
      head tmp/index.js
      node -v
      node --harmony tmp/index.js
    fi
  done


  ns='restart'
  name='index.js'
  file="app/$name"
  while true
  do 
    inotifywait $file -qe close_write
    cat $file | redis-cli -x -p 6333 set $ns:$name
    redis-cli -p 6333 lpush $ns:req $name
  done


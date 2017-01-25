
  ns='restart'
  name='index.js'
  file="app/$name"
  sha() {
    cat $file | sha1sum | cut -f1 -d' '
  }
  sha=`sha`
  while true
  do 
    inotifywait $file -t 1 -qe close_write
    if [ "$sha" != `sha` ]
    then
      sha=`sha`
      cat $file | redis-cli -x -p 6333 set $ns:$name
      redis-cli -p 6333 lpush $ns:req $name
    fi
  done


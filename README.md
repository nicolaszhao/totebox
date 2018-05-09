# Tote Box
NZ 的个人工具库



## ability

### listenPageVisibility( handler )

### cache

#### cache.get( key )

#### cache.set( key, value )

#### cache.remove( key )

#### cache.clear()

### cacheTable

#### cacheTable.get( primaryKey, secondaryKey )

#### cacheTable.set( primaryKey, secondaryKey, value )

#### cacheTable.remote( primaryKey, secondaryKey )

#### cacheTable.clear( primaryKey )



## history

### historyInst.getPrev()

### historyInst.getNext()

### historyInst.size()

### historyInst.add( url )

### historyInst.find( url )

### historyInst.direct( url )



## http

### http.get( url [ , data, options ] )

### http.post( url [ , data, options ] )

### http.put( url [ , data, options ] )

### http.patch( url [ , data, options ] )

### http.delete( url [ , data, options ] )

### http.defaults



## string

### parseTextPlaceholder( text, data [ , dataReplaceable ] )



## time

### timeParser( time [ , units = [ '年', '月', '周', '天', '小时', '分钟', '秒' ] ] )

### timer( second [ , { onStart, onProgress, onEnd }, context ] )



## util

### type( obj )

### deepAssign( target, source1 [ , source2... ] )



## query

### getQuerys( [ url ] )

### addQuerys( [ url, querys ] )

### querys( [ url, querys ] )



## License

[MIT](LICENSE)
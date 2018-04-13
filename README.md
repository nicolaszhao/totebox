# Tote Box
NZ's private utils.



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

```js
const history = new History();
```

### history.getActive()

### history.getPrev()

### history.getNext()

### history.size()

### history.add( url )

### history.find( url )

### history.direct( url )



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



## util

### type( obj )

### deepAssign( target, source1 [ , source2... ] )


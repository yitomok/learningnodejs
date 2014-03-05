var http = require('http')
, async = require('async')

var httpget = function(url, done) {
  http.get(url, function(r) {
    var b = ''
    r.setEncoding('utf8')
    r.on('data', function(s) {
      b += s
    })
    r.on('end', function() {
      done(null, b)
    })
  }).on('error', function(e) {
    done(e)
  })
}

async.map(process.argv.slice(2), function(u, done){
    httpget(u, done)
  }, function(err, results){
    if (err) return console.log(err)
    console.log(results)
});

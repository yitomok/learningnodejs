var http = require('http')
, async = require('async')

var httpget = function(url, done) {
  http.get(url, function(r) {
    r.on('data', function(s) {
    })
    r.on('end', function() {
      done()
    })
  }).on('error', function(e) {
    done(e)
  })
}

async.each(process.argv.slice(2), function(u, done){
    httpget(u, done)
  }, function(err){
    if (err) console.log(err)
});

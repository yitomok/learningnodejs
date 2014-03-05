var http = require('http')
var async = require('async')

var httpget = function(url, done) {
  var b = ''
  http.get(url, function(r) {
    r.setEncoding('utf8')
    r.on('data', function(s) {
      b += s
    })
    r.on('end', function() {
      done(null, b)
    })
  })
}

async.series({
  requestOne: function(done){
    httpget(process.argv[2], done)
  },
  requestTwo: function(done){
    httpget(process.argv[3], done)
  }
  }, function(err, result){
    console.log(result);
});

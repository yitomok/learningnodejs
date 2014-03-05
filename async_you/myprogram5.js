var http = require('http')
, async = require('async')

var httpreq = function(hostname, port, number, done) {
  var opts = {
    hostname: hostname,
    port: port,
    path: '/users/create',
    method: 'POST'
  }
  var req = http.request(opts)
  req.write(JSON.stringify({'user_id': number}) + '\n')
  req.end()
  done()
}

async.series([
function(done) {
  async.times(5, function(n, next) {
    httpreq(process.argv[2], process.argv[3], ++n, function(err, r) { next(err, r) })
  }, function(err, results) {
    if (err) return console.log(err)
    done(null, 'saved')
  })
},
function(done) {
  var opts = {
    hostname: process.argv[2],
    port: process.argv[3],
    path: '/users',
    method: 'GET'
  }
  var req = http.get(opts, function(r) {
    var b = ''
    r.setEncoding('utf8')
    r.on('data', function(s) {
      b += s
    })
    r.on('end', function() {
      done(null, b)
    })
  })
}
], function(err, result) {
  if (err) return console.error(err);
  console.log(result);
})


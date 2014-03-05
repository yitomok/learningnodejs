var http = require('http'),
  fs = require('fs'),
  async = require('async')

async.waterfall([
function(done) {
  fs.readFile(process.argv[2], function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
},
function(data, done) {
  var b = '';
  http.get(data.toString().trim(), function(r) {
    r.setEncoding('utf8');
    r.on('data', function(s) {
      b += s;
    });
    r.on('end', function() {
      done(null, b)
    });
  })
}
],
function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

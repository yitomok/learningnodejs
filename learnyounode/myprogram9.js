var http = require('http')
var b = ['', '', '']
var c = 0
function httpget(i) {
  http.get(process.argv[2 + i], function(r) {
    r.setEncoding('utf8')
    r.on('data', function(s) {
      b[i] += s;
    });
    r.on('end', function() {
      c++
    })
  })
}

for (var i = 0; i < 3; i++)
  httpget(i)

var func = function() { if (c == 3) { b.forEach(function(s) { console.log(s) }) } else { setTimeout(func, 1000) } }
setTimeout(func, 1000);

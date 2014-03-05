var b = '';
require('http').get(process.argv[2], function(r) { r.setEncoding('utf8'); r.on('data', function(s) { b += s; } ); r.on('end', function() { console.log(b.length); console.log(b) }) });

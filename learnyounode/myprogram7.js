require('http').get(process.argv[2], function(r) { r.setEncoding('utf8'); r.on('data', console.log) });

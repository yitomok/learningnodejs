var mymodule = require('./myprogram6.1.js')

mymodule(process.argv[2], process.argv[3], function (err, list) { if (!err) { list.forEach(function (file) { console.log(file); }) } })

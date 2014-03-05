var url = require('url')
var http = require('http')
var map = require('through2-map')
var server = http.createServer(function (req, res) {
  if (req.method != 'GET')
    return res.end('send me a GET\n')
  var o = url.parse(req.url, true)
  if (o.pathname === '/api/parsetime') {
    var d = new Date(o.query.iso)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 'hour': d.getHours(), 'minute': d.getMinutes(), 'second': d.getSeconds() }))
  } else if (o.pathname === '/api/unixtime') {
    var d = new Date(o.query.iso)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 'unixtime': d.getTime() }))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))

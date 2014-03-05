module.exports = function (d, e, c) {
  require('fs').readdir(d, function (err, list) {
    if (err)
      return c(err)
    c(null, list.filter(function (file) { return require('path').extname(file)==='.'+e }));
  })
}

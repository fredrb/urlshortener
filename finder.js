'use strict';

const URL = require('./URLSchema.js');

module.exports = function(url, callback) {
  URL.find({short : url}, function(err, url) {
    if (url.length == 0 || err)
      callback(err, null);
    else
      callback(err, url[0].original);
  });
}

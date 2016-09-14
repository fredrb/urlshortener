'use strict';

const crypto = require('crypto');
const URL = require('./URLSchema.js');

module.exports = function(url, callback) {
  generateUniqueHash(function(shortUrl) {
    let urlRecord = new URL({
      original : url,
      short : shortUrl
    });

    urlRecord.save((err) => console.log(err));
    callback(shortUrl);
  });
}

function generateUniqueHash(callback) {
  let id = crypto.randomBytes(4, (err, buf) => {
    if (err) console.log(err);
    let shortUrl = buf.toString('hex');
    URL.find({short: shortUrl}, function (err, urls) {
      if (urls.length == 0) {
        callback(shortUrl);
      } else {
        generateUniqueHash(callback);
      }
    });
  });
}

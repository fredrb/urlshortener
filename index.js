'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let shortener = require('./shortener.js');
let finder = require('./finder.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/url');

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/short', function(req, res) {
  let url = req.body.url;
  shortener(url, (result) => res.send(`/${result}`));
});

app.get('/*', function(req, res) {
  finder(req.params[0], function(err, url) {
    if (err || url == null)
      res.send('URL not found');
    else
      res.redirect(url);
  })
});

app.listen(8080);

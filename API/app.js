var express = require('express');
import bodyParser from 'body-parser';

var app = express();

import mongoose from 'mongoose';
import route from './route/index.route'

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Expires, Authorization, Accept, Cache-Control, Pragma");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));


// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/arkeneaTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Mongodb connected"))
.catch(err => console.log("Mongo Error "+err));

app.use('/api', route);
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
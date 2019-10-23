const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');
const DataLayerFactory = require('./datalayer/factory.datalayer');
const routes = require('./config/routes');
const path = require('path');
var cors = require('cors');

const port = process.env.PORT || 3000;

const whitelist = config.mongo.allowedCORSDomains;
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

const app = express();

app.use(express.static(path.join(__dirname,'../Client/dist')));
app.get('*',(req, res)=>{
  res.send(path.join(__dirname, '../Client/dist/index.html'))
})


app.use(bodyParser.json({limit: '1mb'}));
app.use(cors(corsOptionsDelegate));

app.use('/api/v1', routes);

DataLayerFactory.initMongoDataLayer().then(() => {
    console.log(`API Server listening on port ${port}`);
    app.listen(port);
});

module.exports = app;

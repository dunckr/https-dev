const express = require('express');
const https = require('https');

const httpsDev = require('..');

const ssl = httpsDev();

const app = express();

app.get('/', (req, res) => res.send('httpsDev'));

https.createServer(ssl, app).listen(3000);

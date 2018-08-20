const https = require('https');

const httpsDev = require('..');

const ssl = httpsDev();

https.createServer(ssl, (req, res) => res.end('httpsDev')).listen(3000);

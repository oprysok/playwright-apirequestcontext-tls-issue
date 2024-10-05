import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const options = {
  cert: fs.readFileSync(path.join(__dirname, './certs/server.crt')),
  key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
  ca: fs.readFileSync(path.join(__dirname, './certs/server.crt')),

  requestCert: true,
  rejectUnauthorized: true, 
};

const app = express();

app.get('/api/sample', (_, res) => {
  res.json({ message: 'Hello world!' });
});

http.createServer(app).listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});

https.createServer(options, app).listen(3003, () => {
  console.log('Secure server running on https://localhost:3003');
});

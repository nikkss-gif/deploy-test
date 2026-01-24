const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.send('connected');
});

process.on('SIGTERM', () => {
  console.log('Graceful shutdown');
  server.close(() => process.exit(0));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
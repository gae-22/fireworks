const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '../client')));

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        if (message === 'launchFireworks') {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('launchFireworks');
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

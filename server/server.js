const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true, // Allow cookies, if needed
    },
});
const port = 3001;

// Enable cors
app.use(cors());


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat_message', (message) => {
        const messageWithId = { id: socket.id, message };
        io.emit('received_message', messageWithId);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
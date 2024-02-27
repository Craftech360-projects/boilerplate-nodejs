module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('A new client has connected.');

        // Event handler for sending a message from a specific route
        socket.on('sendMessageRoute', (message) => {
            console.log('Message received from "/send-message" route:', message);
            io.emit('newMessageRoute', message); // Broadcast the message to all clients
        });

        // Event handler for receiving and echoing a message
        socket.on('sendMessage', (message) => {
            console.log('Message received from client:', message);
            socket.emit('echoMessage', message); // Echo the message back to the client
        });

        // Event handler for broadcasting a message to all clients except sender
        socket.on('broadcastMessage', (message) => {
            console.log('Broadcasting message to all clients:', message);
            socket.broadcast.emit('newBroadcastMessage', message); // Broadcast the message to all clients except sender
        });

        // Event handler for handling client disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

 
    });
};

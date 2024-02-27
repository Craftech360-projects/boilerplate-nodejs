const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const database = require('./database'); // Make sure to create this module
const socket = require('./socket');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(__dirname + '/public'));

// Serve static files
app.use(express.static("public"));


socket(io);

app.get('/', (req, res) => {
  res.render('index');
});

// Example route using EJS template
app.get('/example', (req, res) => {
    res.render('example', { message: 'Hello from the server!' });
});


app.post('/add-data', (req, res) => {
  const { name, description } = req.body;
  database.create('example_table', { name, description })
    .then(() => res.send('Data added successfully!'))
    .catch((err) => res.status(500).send(err.message));
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

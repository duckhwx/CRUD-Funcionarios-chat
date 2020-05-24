// Criação da API
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const socket = require('./src/socket');
const config = require('./config/Config.json');
const router = require('./src/router/');


app.set('port', config.port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const server = app.listen(app.get('port'), () => {
    console.log(`Server Running on ${app.get('port')}`);
});

// Instancia do socket
socket(require('socket.io')(server));
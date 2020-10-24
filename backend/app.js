const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Morgan para mostrar información de las peticiones
app.use(
  morgan((tokens, req, res) => {
    return (
      colors.blue('[' + tokens.method(req, res) + ' ' + colors.blue(tokens.status(req, res)) + ']') +
      ' ' +
      colors.blue(tokens.url(req, res)) +
      ' ' +
      colors.blue(tokens['response-time'](req, res) + ' ms\n')
    );
  })
);

// Rutas
app.use('/', require('./routes/userAccount.route'));
app.use('/', require('./routes/vendingMachine.route'));

const port = 3000;
app.listen(port, () => console.log('Escuchando puerto ' + port));

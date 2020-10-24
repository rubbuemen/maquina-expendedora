const colors = require('colors');

function errorThrown(codigo, mensaje) {
  const error = new Error();
  error.message = mensaje;
  error.status = codigo;
  return error;
}

function controlError(error, res) {
  if (error.status && error.message) {
    console.error(colors.red('[Error ' + error.status + ']'));
    console.error(colors.red(error.stack));
    return res.status(error.status).send({ error: error.message });
  } else {
    console.error(colors.red(error));
    return res.status(500).send({ error });
  }
}

module.exports.errorThrown = errorThrown;
module.exports.controlError = controlError;

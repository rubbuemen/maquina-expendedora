const jwt = require('jsonwebtoken');
const { errorThrown, controlError } = require('../util/error.util');

const permissions = async (req, res, next, roles) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) throw errorThrown(401, 'Acceso Denegado. No existe ningún token');
    const payload = await jwt.verify(token, process.env.SECRET_KEY); // Comparamos el token actual con la palabra secreta
    if (!roles.includes(payload.authority)) throw errorThrown(403, 'El rol del usuario no está permitido');
    req.userAccount = payload;
    next();
  } catch (error) {
    return controlError(error, res);
  }
};

// Privilegios supplier
exports.supplier = (req, res, next) => permissions(req, res, next, ['SUPPLIER']);

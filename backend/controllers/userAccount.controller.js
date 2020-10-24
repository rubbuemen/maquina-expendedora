const { errorThrown, controlError } = require('../util/error.util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userAccountSeed } = require('../seeders/userAccount.seed');

exports.login = (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password) throw errorThrown(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const checkUserAccount = userAccountSeed.some(userAccount => userAccount.user === user);
    if (!checkUserAccount) {
      throw errorThrown(404, 'El usuario introducido no existe');
    }
    const userAccount = userAccountSeed.filter(userAccount => userAccount.user === user)[0];
    const passwordCorrect = bcrypt.compareSync(password, userAccount.password); //pruebas123
    if (!passwordCorrect) throw errorThrown(401, 'La contraseña introducida es incorrecta');
    const jwtToken = jwt.sign({ user: userAccount.user, authority: userAccount.authority }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(200).send({ jwtToken });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.renewToken = async (req, res) => {
  try {
    const userAccount = req.userAccount.user;
    const jwtToken = jwt.sign({ user: userAccount.user, authority: userAccount.authority }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(200).send({ jwtToken });
  } catch (error) {
    return controlError(error, res);
  }
};

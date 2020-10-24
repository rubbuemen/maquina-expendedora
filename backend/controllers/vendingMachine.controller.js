const { errorThrown, controlError } = require('../util/error.util');
const { vendingMachineSeed } = require('../seeders/vendingMachine.seed');
const { refund } = require('../util/functions.util');

// exports.getStockBeverage = (req, res) => {
//   try {
//     const beverageId = req.params.beverageId;
//     const checkBeverageId = vendingMachineSeed[0].some(beverage => beverage.id === beverageId);
//     if (!checkBeverageId) {
//       throw errorThrown(404, 'No existe ninguna bebida para la ID indicada');
//     }
//     const beverage = vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0];
//     return res.status(200).send({ product: beverage.product, stock: beverage.stock });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

exports.insertCoin = (req, res) => {
  try {
    const { coinId } = req.body;
    if (!coinId) throw errorThrown(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const checkCoinId = vendingMachineSeed[1].some(coin => coin.id === coinId);
    if (!checkCoinId) {
      throw errorThrown(404, 'No existe ninguna moneda para la ID indicada');
    }
    //Incrementamos la cantidad de esa moneda en la máquina
    vendingMachineSeed[1].filter(coin => coin.id === coinId)[0].amount = vendingMachineSeed[1].filter(coin => coin.id === coinId)[0].amount + 1;
    //Obtenemos la moneda insertada
    const coin = vendingMachineSeed[1].filter(coin => coin.id === coinId)[0];
    //Calculamos el total actual de dinero insertado (con posibilidad de que hubiera ya dinero insertado de antes)
    let totalTemp = parseFloat(vendingMachineSeed[2]);
    totalTemp = parseFloat((totalTemp + coin.money).toFixed(2)); //Necesario para evitar error de aprox
    vendingMachineSeed[2] = totalTemp;
    return res.status(200).send({ totalCurrentMoney: vendingMachineSeed[2] });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.selectProduct = (req, res) => {
  try {
    const beverageId = req.params.beverageId;
    const checkBeverageId = vendingMachineSeed[0].some(beverage => beverage.id === beverageId);
    if (!checkBeverageId) {
      throw errorThrown(404, 'No existe ninguna bebida para la ID indicada');
    }
    const beverage = vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0];
    //Comprobamos restricciones de la máquina
    if (vendingMachineSeed[2] < beverage.price) {
      const remainingAmount = beverage.price - vendingMachineSeed[2];
      throw errorThrown(400, 'Cantidad de dinero insuficiente, le quedan por insertar ' + remainingAmount + ' €');
    }
    if (beverage.stock === 0) {
      throw errorThrown(400, 'Bebida sin stock');
    }
    //Actualizamos el valor de stock de la bebida
    vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0].stock =
      vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0].stock - 1;
    //Actualizamos el total actual insertado
    vendingMachineSeed[2] = parseFloat(vendingMachineSeed[2] - beverage.price).toFixed(2);
    return res.status(200).send({ beverageObtained: beverage.product, returnChange: refund(vendingMachineSeed) });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.refund = (req, res) => {
  try {
    return res.status(200).send({ returnChange: refund(vendingMachineSeed) });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.refillBeverage = (req, res) => {
  try {
    const beverageId = req.params.beverageId;
    const checkBeverageId = vendingMachineSeed[0].some(beverage => beverage.id === beverageId);
    if (!checkBeverageId) {
      throw errorThrown(404, 'No existe ninguna bebida para la ID indicada');
    }
    const { stock } = req.body;
    if (stock === undefined) throw errorThrown(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (stock < 1) {
      throw errorThrown(400, 'El stock a reponer debe ser mayor que 0');
    }
    const beverage = vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0];
    //Incrementamos la cantidad de esa bebida en la máquina
    vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0].stock =
      vendingMachineSeed[0].filter(beverage => beverage.id === beverageId)[0].stock + stock;
    return res.status(200).send({ product: beverage.product, stock: beverage.stock });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.refillCoin = (req, res) => {
  try {
    const { coinId, amount } = req.body;
    const checkCoinId = vendingMachineSeed[1].some(coin => coin.id === coinId);
    if (!checkCoinId) {
      throw errorThrown(404, 'No existe ninguna moneda para la ID indicada');
    }
    if (amount === undefined) throw errorThrown(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (amount < 1) {
      throw errorThrown(400, 'La cantidad a reponer debe ser mayor que 0');
    }
    const coin = vendingMachineSeed[1].filter(coin => coin.id === coinId)[0];
    //Incrementamos la cantidad de esa moneda en la máquina
    vendingMachineSeed[1].filter(coin => coin.id === coinId)[0].amount = vendingMachineSeed[1].filter(coin => coin.id === coinId)[0].amount + amount;
    return res.status(200).send({ coin: coin.type, amount: coin.amount });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getAllBeverages = (req, res) => {
  try {
    return res.status(200).send({ beverages: vendingMachineSeed[0] });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getAllCoins = (req, res) => {
  try {
    return res.status(200).send({ coins: vendingMachineSeed[1] });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getTotalCurrentMoney = (req, res) => {
  try {
    return res.status(200).send({ totalCurrentMoney: vendingMachineSeed[2] });
  } catch (error) {
    return controlError(error, res);
  }
};

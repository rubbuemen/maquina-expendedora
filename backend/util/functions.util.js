const { errorThrown } = require('../util/error.util');

const composeAmount = function (coins, ac, i, remainingMoney) {
  if (i < 0 || remainingMoney == 0) {
    return ac;
  } else {
    c = coins[i];
    i = i - 1;
    if (c.amount > 0) {
      if (remainingMoney >= c.money) {
        i = coins.indexOf(c);
        ac[i] = ac[i] + 1;
        remainingMoney = parseFloat(remainingMoney - c.money).toFixed(2);
      }
      return composeAmount(coins, ac, i, remainingMoney);
    }
  }
};

const composeAmountFinal = function (coins, remainingMoney) {
  ac = [0, 0, 0, 0, 0, 0, 0, 0];
  return composeAmount(coins, ac, ac.length - 1, remainingMoney);
};

const showResultsComposeAmount = function (res, coins) {
  let text = '';
  for (let i = 0; i < res.length; i++) {
    const coin = coins[i];
    const amount = res[i];
    if (amount > 0) {
      if (amount === 1) {
        text = text + amount + ' moneda de ' + coin.type + ', ';
      } else {
        text = text + amount + ' monedas de ' + coin.type + ', ';
      }
    }
  }
  text = text.slice(0, -2);
  return text;
};

exports.refund = function (vendingMachineSeed) {
  //Realizamos a devolución más óptima de dinero según las monedas que haya en la máquina
  const returnChangeCalc = composeAmountFinal(vendingMachineSeed[1], vendingMachineSeed[2]);
  if (!returnChangeCalc) {
    throw errorThrown(400, 'Lo sentimos, no hay suficientes monedas en la máquina para devolver el cambio');
  }
  for (let i = 0; i < returnChangeCalc.length; i++) {
    if (returnChangeCalc[i] > 0) {
      vendingMachineSeed[1][i].amount = vendingMachineSeed[1][i].amount - returnChangeCalc[i];
    }
  }
  const returnChangeShow = showResultsComposeAmount(returnChangeCalc, vendingMachineSeed[1]);
  //Reseteamos la cantidad actual total de dinero ya devuelto
  vendingMachineSeed[2] = 0;
  return returnChangeShow;
};

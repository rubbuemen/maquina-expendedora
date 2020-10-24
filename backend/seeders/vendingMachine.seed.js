const vendingMachineSeed = [
  (beverages = [
    {
      id: '1',
      product: 'Coca-Cola',
      stock: 10,
      price: 1.5,
    },
    {
      id: '2',
      product: 'Coca-Cola Light',
      stock: 5,
      price: 1.5,
    },
    {
      id: '3',
      product: 'Fanta Limón',
      stock: 10,
      price: 1.5,
    },
    {
      id: '4',
      product: 'Fanta Naranja',
      stock: 10,
      price: 1.5,
    },
    {
      id: '5',
      product: 'Seven Up',
      stock: 10,
      price: 1.5,
    },
    {
      id: '6',
      product: 'Botella de agua',
      stock: 20,
      price: 1,
    },
  ]),
  (coins = [
    {
      id: '1',
      type: '1 céntimo',
      money: 0.01,
      amount: 0,
    },
    {
      id: '2',
      type: '2 céntimos',
      money: 0.02,
      amount: 5,
    },
    {
      id: '3',
      type: '5 céntimos',
      money: 0.05,
      amount: 5,
    },
    {
      id: '4',
      type: '10 céntimos',
      money: 0.1,
      amount: 5,
    },
    {
      id: '5',
      type: '20 céntimos',
      money: 0.2,
      amount: 5,
    },
    {
      id: '6',
      type: '50 céntimos',
      money: 0.5,
      amount: 5,
    },
    {
      id: '7',
      type: '1 €',
      money: 1,
      amount: 5,
    },
    {
      id: '8',
      type: '2 €',
      money: 2,
      amount: 5,
    },
  ]),
  (totalCurrentMoney = 0),
];

module.exports.vendingMachineSeed = vendingMachineSeed;

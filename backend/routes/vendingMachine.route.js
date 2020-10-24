const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const vendingMachineController = require('../controllers/vendingMachine.controller');

router.get('/', (req, res) => vendingMachineController.getAllBeverages(req, res));
router.get('/coins', (req, res) => vendingMachineController.getAllCoins(req, res));
router.get('/totalCurrentMoney', (req, res) => vendingMachineController.getTotalCurrentMoney(req, res));

router.put('/', (req, res) => vendingMachineController.insertCoin(req, res));
router.put('/refillCoin', auth.supplier, (req, res) => vendingMachineController.refillCoin(req, res));
router.put('/:beverageId', (req, res) => vendingMachineController.selectProduct(req, res));
router.get('/refund', (req, res) => vendingMachineController.refund(req, res));
// router.get('/:beverageId', (req, res) => vendingMachineController.getStockBeverage(req, res));
router.put('/refillBeverage/:beverageId', auth.supplier, (req, res) => vendingMachineController.refillBeverage(req, res));

module.exports = router;

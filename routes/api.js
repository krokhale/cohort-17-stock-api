var express = require('express');
var router = express.Router();
const yahooStockPrices = require('yahoo-stock-prices')
const models = require('../lib/models')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('this is the API route!')
});

router.get('/search/:symbol', async function(req, res, next) {
    // req.params is going to have the value of the symbol here
    console.log(req.params)
    // let items = await Portfolio.findAll({});
    try {
        const data = await yahooStockPrices.getCurrentData(req.params.symbol);
        res.json({success: true, data: data});
    } catch(err){
        console.log(err)
        res.json({success: false, data: {}});
    }
});

router.post('/portfolio', async function(req, res, next) {
    console.log('req.body is', req.body)
    let portfolioRow = await models.Portfolio.create({symbol: req.body.stockName, quantity: req.body.buyValue, price: req.body.stockPrice})
    res.json(portfolioRow)
});

// CORS requests

module.exports = router;

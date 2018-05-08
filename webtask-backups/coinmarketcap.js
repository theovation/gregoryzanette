var rp = require("request-promise");
  
module.exports = function(context, cb) {
  var data = [];
  rp('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(function(res){
    var coins = JSON.parse(res);
    for(var i = 0; i < coins.length; i++) {
       //if(parseInt(coins[i].percent_change_1h) > 2) {
          data.push({
            symbol: coins[i].symbol,
            price: coins[i].price_usd,
            change1hr: coins[i].percent_change_1h
          });
       //}
    }
    cb(null, { result: data });
  })
};

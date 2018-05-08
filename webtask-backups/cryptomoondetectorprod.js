var rp = require("request-promise");
var _ = require("underscore")

module.exports = function(context, cb) {
  var interval = context.query.interval;
  var data = [];
  var sorted = [];
  
  rp('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(function(res){
    var coins = JSON.parse(res);
    if(interval === 'hour') {
      console.log('in hour')
      for(var i = 0; i < coins.length; i++) {
        data.push({ 
          coinName: coins[i].symbol,
          price: coins[i].price_usd,
          hourChange: parseFloat(coins[i].percent_change_1h),
          dayChange: coins[i].percent_change_24h,
          weekChange: coins[i].percent_change_7d,
        });
      }
      var sorted = _.sortBy(data, function(o) { return -o.hourChange; })
      console.log(data);
    } else if (interval === 'day') {
      for(var j = 0; j < coins.length; j++) {
        data.push({
          coinName: coins[j].symbol,
          price: coins[j].price_usd,
          hourChange: coins[j].percent_change_1h,
          dayChange: parseFloat(coins[j].percent_change_24h),
          weekChange: coins[j].percent_change_7d,
        });
        var sorted = _.sortBy(data, function(o) { return o.dayChange; })
      }
    } else if(interval === 'week') {
      for(var k = 0; k < coins.length; k++) {
        data.push({
          symbol: coins[k].symbol,
          price: coins[k].price_usd,
          hourChange: coins[k].percent_change_1h,
          dayChange: coins[k].percent_change_24h,
          weekChange: parseFloat(coins[k].percent_change_7d),
        });
      }
      var sorted = _.sortBy(data, function(o) { return o.weekChange; })
    }
    
    cb(null, { result: sorted });
  });
};
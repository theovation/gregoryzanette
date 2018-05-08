
var request = require("request");
var aws = require("aws-sdk");
var moment = require("moment");
var activeCurrencies = ['NEO', 'OMG', 'ETC'];
var rp = require('request-promise');
var twilio = require("twilio");
var AWS = require('aws-sdk');
var btcPrice = null;
var previousPrices = [];
var latestPrices = [];
var firebase = require("firebase@3.6.9");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtsyiicA06-yK58MgeDFPamOOUwmcFj5o",
    authDomain: "cryptodata-8a964.firebaseapp.com",
    databaseURL: "https://cryptodata-8a964.firebaseio.com",
    projectId: "cryptodata-8a964",
    storageBucket: "cryptodata-8a964.appspot.com",
    messagingSenderId: "587707119061"
  };
  firebase.initializeApp(config);

var client = new twilio('AC0109675f5afcef6b198f4d544c4c2a0a', '81cc62f3be322f07d6f020fde219e238');
 
 AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

var s3bucket = new AWS.S3({params: {Bucket: 'cryptocurrdata'}});


var criteriaPercent = 3;

var filteredCurrencies = [];

var activeCurrencies = ["LTC","DOGE","VTC","PPC","FTC","RDD","NXT","DASH","POT","BLK","EMC2","XMY","AUR","UTC","MZC","EFL","GLD","FAIR","SLR","PTC","GRS","NLG","RBY","XWC","MONA","BITS","OC","THC","ENRG","SFR","ERC","NAUT","VRC","CURE","BLC","XC","XDQ","XBB","HYPER","CCN","XMR","CLOAK","BSD","CRYPT","START","KORE","XDN","TRK","TRUST","NAV","XST","APEX","BTCD","VIA","TRI","UNO","PINK","IOC","MAX","LXC","BOB","CANN","FC2","SSD","J","SYS","NEOS","DGB","ROOT","BTS","BURST","TIT","BSTY","PXI","DGC","SLG","STV","EXCL","SWIFT","NET","GHC","DOPE","BLOCK","ABY","VIOR","BYC","UFO","XMG","XQN","BLITZ","VPN","BAY","DTC","AM","METAL","SPR","VTR","XPY","XRP","GAME","GP","NXS","COVAL","FSC2","SOON","HZ","XCP","BITB","XTC","XVG","GEO","FLDC","GEMZ","GRC","XCO","MTR","FLO","U","NBT","XEM","MUE","XVC","8BIT","CLAM","XSEED","NTRN","SLING","DMD","GAM","UNIT","GRT","VIRAL","SPHR","ARB","OK","ADC","SNRG","PKB","TES","CPC","AEON","BITZ","ETH","GCR","TX","BCY","PRIME","EXP","NEU","SWING","INFX","OMNI","USDT","AMP","AGRS","XLM","SPRTS","YBC","BTA","MEC","BITCNY","AMS","SCRT","SCOT","CLUB","VOX","MND","EMC","FCT","MAID","FRK","EGC","SLS","ORB","STEPS","RADS","DCR","SAFEX","PIVX","WARP","CRBIT","MEME","STEEM","2GIVE","LSK","KR","PDC","DGD","BRK","WAVES","RISE","LBC","SBD","BRX","DRACO","ETC","UNIQ","STRAT","UNB","SYNX","TRIG","EBST","VRM","XAUR","SEQ","SNGLS","REP","SHIFT","ARDR","XZC","NEO","ZEC","ZCL","IOP","DAR","GOLOS","GBG","UBQ","HKG","KMD","SIB","ION","LMC","QWARK","CRW","SWT","TIME","MLN","TKS","ARK","DYN","MUSIC","DTB","INCNT","GBYTE","GNT","NXC","EDG","LGD","TRST","WINGS","RLC","GNO","GUP","LUN","APX","TKN","HMQ","ANT","ZEN","SC","BAT","1ST","QRL","CRB","TROLL","PTOY","MYST","CFI","BNT","NMR","SNT","DCT","XEL","MCO","ADT","FUN","PAY","MTL","STORJ","ADX","OMG","CVC","PART","QTUM","BCC","DNT","ADA","MANA","SALT","TIX","RCN","VIB","MER","POWR","BTG"];

function getOldPrices() {
   console.log('getting old prices');
   return new Promise(function(success, reject) {
        s3bucket.getObject(
            { Bucket: "cryptocurrdata", Key: 'bittrex/prices.json' },
            function (error, data) {
                if(error) {
                    reject(error);
                } else {
                    success(JSON.parse(data.Body.toString()).prices);
                }
            }
        );
    });
}

function calculateDiff(mergePrices, cb) {
    var currenciesToSendTextTo = [];
    var diffArray = []; // [{'currName': '', diff: ''}]
    console.log('calculateDiff');
    for(var k = 0; k < mergePrices.length; k++) {
      var increase = mergePrices[k].current - mergePrices[k].previous;
      var diff = (increase / mergePrices[k].previous) * 100;
      
      if(diff < 3) {
        continue;
      }
      
      diffArray.push({
        'name' : mergePrices[k].name,
        'diff' : diff
      });
    }
    
    var result = diffArray.map(function(elem){
        return elem.name + " - " + elem.diff + "%";
      }).join(",")
    
  firebase.database().ref()
	.child("bittrex")
	.push({
	  "date": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
	  "coins": result
	})
	.then(function(res){
	}).catch();
    
    /*
    client.messages.create({
      to: '+16313385074',
      from: '+16179413540',
      body: result
    }, function(err, message) {});
    */
    cb(null, { diffArray: result}); 
    /*
    for(var l = 0; l < diffArray.length; l++) {
      if(mergePrices[l].diff > 3) {
        currenciesToSendTextTo.push(mergePrices[l].name);
      }
    }
  
            client.messages.create({
           to: '+16313385074',
           from: '+16179413540',
           body: currenciesToSendTextTo.join()
          }, function(err, message) {
            console.log(message.sid); 
          });
  
   cb(null, { filteredCurrencies: currenciesToSendTextTo.join()}); 
   */
}

function mergePriceArrays(cb, oldPrices, newPrices) {
  console.log('mergePriceArrays')
  var previousPrices = oldPrices;
  var latestPrices = newPrices;
  
  var mergePrices = [];
  // var previousPrices = [];
  // var latestPrices = [];
  for(var i = 0; i < previousPrices.length; i++) {
    var name = previousPrices[i].name;
    var previousPrice = previousPrices[i].price
    var latestPrice = false;
    
    for(var j = 0; j < latestPrices.length; j++) {
      if(latestPrices[j].name === name) {
        latestPrice = latestPrices[j].price;    
      }
    }
    
    if(!latestPrice) {
      continue;
    }
    
    mergePrices.push({
      'name' : name,
      'previous': previousPrice,
      'current': latestPrice
    });
  }
  
  return mergePrices;
}

function sendBuyNotication() {
  
}

function sendSellNotication() {
  
}

function getNewPrice(currency) {
  var newPrice = null;
   rp('https://bittrex.com/api/v1.1/public/getticker?market=btc-' + currency)
    .then(function (response) {
      var res = JSON.parse(response);
      if(res.success === true && res.result !== null) {
        latestPrices.push({ 
          price: res.result.Last * btcPrice,
          name: currency
      }); 
      }
    })
    .catch(function (err) {
        console.log(err);
    });
}

function getBTCPriceInUSD(cb, firstRun) {
    rp('https://blockchain.info/ticker')
    .then(function (response) {
        var res = JSON.parse(response);
        btcPrice = res.USD.last;
        for(var i = 0; i < activeCurrencies.length; i++) {
          getNewPrice(activeCurrencies[i]);
        }
        setTimeout(function(){
          if(firstRun) {
            saveToStorage("bittrex/prices.json", JSON.stringify({'prices' : latestPrices }));
            cb(null, { firstRun: latestPrices});
          } else {
          getOldPrices(cb).then(function(response){
              saveToStorage("bittrex/prices.json", JSON.stringify({'prices' : latestPrices }));
              calculateDiff(mergePriceArrays(cb, response, latestPrices), cb);
          })
          }
        },3000)
    })
    .catch(function (err) {
        console.log(err);
    });
}

function getActiveCurrencies(cb) {
  var activeCurrencies = [];
  rp('https://bittrex.com/api/v1.1/public/getcurrencies')
    .then(function (response) {
        var res = JSON.parse(response);
        var currencies = res.result;
        for(var i = 0; i < currencies.length; i++) {
          activeCurrencies.push(currencies[i].Currency);
        }
    })
    .catch(function (err) {
        console.log(err);
    });
}

function initializePrices() {
  
}

module.exports = function(context, cb) {
  // Send the text message.
  var firstRun = false;
  console.log('run')
  getBTCPriceInUSD(cb, firstRun);
  // Copyright Juan Antelo
  // Simple case first.. just compare to previous poll. Buy at greater than 15 degree difference from previous price. Sell at at least 5 percent less than buy price
};

function saveToStorage(url, data) {
    var params = {
      Key: url,
      Body: data,
      Headers:{
        'content-type': 'application/json'
      }
    };
    s3bucket.upload(params, function (err, res) {               
        if(err) {
            console.log("Error in uploading file on s3 due to "+ err);
        }
    });
}














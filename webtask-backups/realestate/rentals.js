// var mongoose = require('mongoose@4.1.6');

var rp = require('request-promise');
var emailJS = require("freemail")
var http = require('http');
var request = require('request');
var req = require('request');
var fs = require('fs');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

// mongoose.connect('mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings', { useMongoClient: true });

var s3bucket = new AWS.S3({params: {Bucket: 'bostonrentals'}});

// Rental Values only
var dataItems = [
  'PROP_TYPE',
  'LIST_NO',
  'LIST_AGENT',
  'LIST_OFFICE',
  'STATUS',
  'LIST_PRICE',
  'STREET_NO',
  'STREET_NAME',
  'UNIT_NO',
  'TOWN_NUM',
  'AREA',
  'ZIP_CODE',
  'LENDER_OWNED',
  'REMARKS',
  'PHOTO_COUNT',
  'PHOTO_DATE',
  'PHOTO_MASK',
  'COUNTY',
  'STATE',
  'RN_TYPE',
  'NO_ROOMS',
  'NO_BEDROOMS',
  'NO_FULL_BATHS',
  'NO_HALF_BATHS',
  'MASTER_BATH',
  'PARKING_SPACES',
  'LOT_SIZE',
  'SQUARE_FEET',
  'NO_BATH'
];

function generateListing(line, listing) {
    var breakpointIndicies = generateBreakpointIndicies(line);
    
    var prev = 0;
    for(var i = 0; i < breakpointIndicies.length; i++) {
      var start = prev;
      var end = breakpointIndicies[i]
      prev = breakpointIndicies[i];

      splitListing(dataItems[i], line.slice(start, prev), listing);
    }
    return listing;
}

function generateBreakpointIndicies(line) {
    var indices = [];
  var array = line;
  var element = '|';
  var idx = array.indexOf(element);
  
  while (idx != -1) {
      indices.push(idx);
      idx = array.indexOf(element, idx + 1);
  }
  return indices;
}

function splitListing(field, line, listing) {
  var nline;

  if (field === 'PROP_TYPE') {
    nline = line;
  } else {
    nline = line.slice(1);
  }

  if(field === 'PROP_TYPE')  {
    listing['PROP_TYPE'] = nline;
  }
  
  if(field === 'LIST_NO')  {
    listing['LIST_NO'] = nline;
  }
  
  if(field === 'LIST_AGENT')  {
    listing['LIST_AGENT'] = nline;
  }
  
  if(field === 'LIST_OFFICE')  {
    listing['LIST_OFFICE'] = nline;
  }

  if(field === 'STATUS')  {
    listing['STATUS'] = nline;
  }

  if(field === 'LIST_PRICE')  {
    listing['LIST_PRICE'] = nline;
  }

  if(field === 'STREET_NO')  {
    listing['STREET_NO'] = nline;
  }

  if(field === 'STREET_NAME')  {
    listing['STREET_NAME'] = nline;
  }

  if(field === 'UNIT_NO')  {
    listing['UNIT_NO'] = nline;
  }

  if(field === 'TOWN_NUM')  {
    listing['TOWN_NUM'] = nline;
  }

  if(field === 'AREA')  {
    listing['AREA'] = nline;
  }
  
  if(field === 'ZIP_CODE')  {
    listing['ZIP_CODE'] = nline;
  }

  if(field === 'LENDER_OWNED')  {
    listing['LENDER_OWNED'] = nline;
  }

  if(field === 'REMARKS')  {
    listing['REMARKS'] = nline;
  }

  if(field === 'PHOTO_COUNT')  {
    listing['PHOTO_COUNT'] = nline;
  }

  if(field === 'PHOTO_DATE')  {
    listing['PHOTO_DATE'] = nline;
  }

  if(field === 'PHOTO_MASK')  {
    listing['PHOTO_MASK'] = nline;
  }

  if(field === 'COUNTY') {
    listing['COUNTY'] = nline;
  }
  if(field === 'STATE') {
    listing['STATE'] = nline;
  }
  if(field === 'RN_TYPE') {
    listing['RN_TYPE'] = nline;
  }
  if(field === 'NO_ROOMS') {
    listing['NO_ROOMS'] = nline;
  }
  if(field === 'NO_BEDROOMS') {
    listing['NO_BEDROOMS'] = nline;
  }
  if(field === 'NO_FULL_BATHS') {
    listing['NO_FULL_BATHS'] = nline;
  }
  if(field === 'NO_HALF_BATHS') {
    listing['NO_HALF_BATHS'] = nline;
  }
  if(field === 'MASTER_BATH') {
    listing['MASTER_BATH'] = nline;
  }
  if(field === 'PARKING_SPACES') {
    listing['PARKING_SPACES'] = nline;
  }
  if(field === 'LOT_SIZE') {
    listing['LOT_SIZE'] = nline;
  }
  if(field === 'SQUARE_FEET') {
    listing['SQUARE_FEET'] = nline;
  }
  if(field === 'NO_BATH') {
    listing['NO_BATH'] = nline;
  }

  //console.log(field + ':' + nline);

  return listing;
}

function indexOf(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].toString() === item.toString()) {
          return i;
        } 
    }
    return -1;
}

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';

module.exports = function(context, cb) {
      var allstonListings = [];
      var backbayListings = [];
      var beaconhillListings = [];
      var brightonListings = [];
      var dorchesterListings = [];
      var brooklineListings = [];
      var westendListings = [];
var lexingtonListings = [];
var marbleheadListings = [];
var natickListings = [];
var needhamListings = [];
var cambridgeListings = [];
var roslindaleListings = [];
var roxburyListings = [];
var seaportListings = [];
var southbostonListings = [];
var southendListings = [];
var dedhamListings = [];
var newtonListings = [];
var somervilleListings = [];
var revereListings = [];
var quincyListings = [];
var walthamListings = [];
var watertownListings = [];
var wellesleyListings = [];
var westonListings = [];
var winthropListings = [];
var eastbostonListings = [];
var charlestownListings = [];
var chinatownListings = [];
var downtownListings = [];
var fenwayListings = [];
var financialdistrictListings = [];
var hydeparkListings = [];
var kenmoreListings = [];
var northendListings = [];
var missionhillListings = [];
var westroxburyListings = [];

  MongoClient.connect(url, function(err, client) {
    rp('http://idx.mlspin.com/idx.asp?user=2KzB9t1MntTFtnBNR7rtdjYyLe2YAztAtuN2tKPrnZhAoFNP7cvUZDaPIDOLfPRqo2Pxtym&proptype=RN').then(function (response) {
      var allListings = response.split( "\r\nRN"); 
      for(var i = 1; i < allListings.length; i++) {
        var listing = {};
        generateListing(allListings[i], listing);


if(listing.ZIP_CODE == "02134") {
	allstonListings.push(listing);
}


if(listing.ZIP_CODE == "02116") {
	backbayListings.push(listing);
}

if(listing.ZIP_CODE == "02108") {
	beaconhillListings.push(listing);
}


if(listing.ZIP_CODE == "02135" || listing.ZIP_CODE == "02134") {
	brightonListings.push(listing);
}


if(listing.ZIP_CODE == "02129") {
	charlestownListings.push(listing);
}


if(listing.ZIP_CODE == "02111") {
	chinatownListings.push(listing);
}


if(listing.ZIP_CODE == "02112") {
	downtownListings.push(listing);
}


if(listing.ZIP_CODE == "02121" ||
   listing.ZIP_CODE == "02122" ||
   listing.ZIP_CODE == "02124" || 
   listing.ZIP_CODE == "02125") {
	dorchesterListings.push(listing);
}

if(listing.ZIP_CODE == "02128") {
	eastbostonListings.push(listing);
}

if(listing.ZIP_CODE == "02115") {
	fenwayListings.push(listing);
}

if(listing.ZIP_CODE == "02109" ||
   listing.ZIP_CODE == "02110" ) {
	financialdistrictListings.push(listing);
}

if(listing.ZIP_CODE == "02136") {
	hydeparkListings.push(listing);
}


if(listing.ZIP_CODE == "02215") {
	kenmoreListings.push(listing);
}


if(listing.ZIP_CODE == "02120") {
	missionhillListings.push(listing);
}


if(listing.ZIP_CODE == "02113") {
	northendListings.push(listing);
}


if(listing.ZIP_CODE == "02131") {
	roslindaleListings.push(listing);
}


if(listing.ZIP_CODE == "02119") {
	roxburyListings.push(listing);
}



if(listing.ZIP_CODE == "02210") {
	seaportListings.push(listing);
}


if(listing.ZIP_CODE == "02127") {
	southbostonListings.push(listing);
}


if(listing.ZIP_CODE == "02118") {
	southendListings.push(listing);
}


if(listing.ZIP_CODE == "02114") {
	westendListings.push(listing);
}


if(listing.ZIP_CODE == "02132") {
	westroxburyListings.push(listing);
}


/* Cities */

if(listing.ZIP_CODE == "02445" ||
   listing.ZIP_CODE == "02446" || 
   listing.ZIP_CODE == "02447" ||
   listing.ZIP_CODE == "02467") {
	brooklineListings.push(listing);
}


if(listing.ZIP_CODE == "02238") {
	cambridgeListings.push(listing);
}


if(listing.ZIP_CODE == "02026") {
	dedhamListings.push(listing);
}


if(listing.ZIP_CODE == "02420" ||
   listing.ZIP_CODE == "02421") {
	lexingtonListings.push(listing);
}


if(listing.ZIP_CODE == "01945") {
	marbleheadListings.push(listing);
}


if(listing.ZIP_CODE == "01760") {
	natickListings.push(listing);
}


if(listing.ZIP_CODE == "02492" ||
   listing.ZIP_CODE == "02494") {
	needhamListings.push(listing);
}


if(listing.ZIP_CODE == "02458" ||
   listing.ZIP_CODE == "02459" || 
   listing.ZIP_CODE == "02460" ||
   listing.ZIP_CODE == "02461" || 
   listing.ZIP_CODE == "02462" ||
   listing.ZIP_CODE == "02464" ||
   listing.ZIP_CODE == "02465" || 
   listing.ZIP_CODE == "02466" ||   
   listing.ZIP_CODE == "02467" || 
   listing.ZIP_CODE == "02468" ||
   listing.ZIP_CODE == "02472") {
	newtonListings.push(listing);
}

if(listing.ZIP_CODE == "02171") {
	quincyListings.push(listing);
}

if(listing.ZIP_CODE == "02151") {
	revereListings.push(listing);
}


if(listing.ZIP_CODE == "02129" ||
   listing.ZIP_CODE == "02141" || 
   listing.ZIP_CODE == "02143" ||
   listing.ZIP_CODE == "02144" ||
   listing.ZIP_CODE == "02145") {
	somervilleListings.push(listing);
}

if(listing.ZIP_CODE == "02451" ||
   listing.ZIP_CODE == "02452" || 
   listing.ZIP_CODE == "02453" ||
   listing.ZIP_CODE == "02454" ||
   listing.ZIP_CODE == "02455") {
	walthamListings.push(listing);
}


if(listing.ZIP_CODE == "02472") {
	watertownListings.push(listing);
}


if(listing.ZIP_CODE == "02481" || listing.ZIP_CODE == "02482") {
	wellesleyListings.push(listing);
}


if(listing.ZIP_CODE == "02453" ||
   listing.ZIP_CODE == "02466" || 
   listing.ZIP_CODE == "02493") {
	westonListings.push(listing);
}


if(listing.ZIP_CODE == "02445") {
	winthropListings.push(listing);
}        

      }
      
console.log(westonListings.length);

saveToStorage("real-estate-data/rentals/allston/all.json", JSON.stringify({'listings': allstonListings }));
saveToStorage("real-estate-data/rentals/backbay/all.json", JSON.stringify({'listings': backbayListings }));
saveToStorage("real-estate-data/rentals/beaconhill/all.json", JSON.stringify({'listings': beaconhillListings }));
saveToStorage("real-estate-data/rentals/brighton/all.json", JSON.stringify({'listings': brightonListings }));
saveToStorage("real-estate-data/rentals/charlestown/all.json", JSON.stringify({'listings': charlestownListings }));
saveToStorage("real-estate-data/rentals/chinatown/all.json", JSON.stringify({'listings': chinatownListings }));
saveToStorage("real-estate-data/rentals/downtown/all.json", JSON.stringify({'listings': downtownListings }));
saveToStorage("real-estate-data/rentals/dorchester/all.json", JSON.stringify({'listings': dorchesterListings }));
saveToStorage("real-estate-data/rentals/eastboston/all.json", JSON.stringify({'listings': eastbostonListings }));
saveToStorage("real-estate-data/rentals/fenway/all.json", JSON.stringify({'listings': fenwayListings }));
saveToStorage("real-estate-data/rentals/financialdistrict/all.json", JSON.stringify({'listings': financialdistrictListings }));
saveToStorage("real-estate-data/rentals/hydepark/all.json", JSON.stringify({'listings': hydeparkListings }));
saveToStorage("real-estate-data/rentals/kenmore/all.json", JSON.stringify({'listings': kenmoreListings }));
saveToStorage("real-estate-data/rentals/missionhill/all.json", JSON.stringify({'listings': missionhillListings }));
saveToStorage("real-estate-data/rentals/northend/all.json", JSON.stringify({'listings': northendListings }));
saveToStorage("real-estate-data/rentals/roslindale/all.json", JSON.stringify({'listings': roslindaleListings }));
saveToStorage("real-estate-data/rentals/roxbury/all.json", JSON.stringify({'listings': roxburyListings }));
saveToStorage("real-estate-data/rentals/seaport/all.json", JSON.stringify({'listings': seaportListings }));
saveToStorage("real-estate-data/rentals/southboston/all.json", JSON.stringify({'listings': southbostonListings }));
saveToStorage("real-estate-data/rentals/southend/all.json", JSON.stringify({'listings': southendListings }));
saveToStorage("real-estate-data/rentals/westend/all.json", JSON.stringify({'listings': westendListings }));
saveToStorage("real-estate-data/rentals/westroxbury/all.json", JSON.stringify({'listings': westroxburyListings }));
saveToStorage("real-estate-data/rentals/brookline/all.json", JSON.stringify({'listings': brooklineListings }));
saveToStorage("real-estate-data/rentals/cambridge/all.json", JSON.stringify({'listings': cambridgeListings }));
saveToStorage("real-estate-data/rentals/dedham/all.json", JSON.stringify({'listings': dedhamListings }));
saveToStorage("real-estate-data/rentals/winthrop/all.json", JSON.stringify({'listings': winthropListings }));
saveToStorage("real-estate-data/rentals/marblehead/all.json", JSON.stringify({'listings': marbleheadListings }));
saveToStorage("real-estate-data/rentals/lexington/all.json", JSON.stringify({'listings': lexingtonListings }));
saveToStorage("real-estate-data/rentals/natick/all.json", JSON.stringify({'listings': natickListings }));
saveToStorage("real-estate-data/rentals/needham/all.json", JSON.stringify({'listings': needhamListings }));
saveToStorage("real-estate-data/rentals/newton/all.json", JSON.stringify({'listings': newtonListings }));
saveToStorage("real-estate-data/rentals/somerville/all.json", JSON.stringify({'listings': somervilleListings }));
saveToStorage("real-estate-data/rentals/waltham/all.json", JSON.stringify({'listings': walthamListings }));
saveToStorage("real-estate-data/rentals/watertown/all.json", JSON.stringify({'listings': watertownListings }));
saveToStorage("real-estate-data/rentals/wellesley/all.json", JSON.stringify({'listings': wellesleyListings }));
saveToStorage("real-estate-data/rentals/weston/all.json", JSON.stringify({'listings': westonListings }));
saveToStorage("real-estate-data/rentals/revere/all.json", JSON.stringify({'listings': revereListings }));
saveToStorage("real-estate-data/rentals/quincy/all.json", JSON.stringify({'listings': quincyListings }));

      
      cb(null, { "status": "success" });
  }).catch(function(e){
      console.log(e)
      cb(null, { "status": "success" });
  })
 });
}

function saveToStorage(url, data) {
    var params = {
      Key: url,
      Body: data,
      Headers:{
        'content-type': 'application/json'
      }
    };
    s3bucket.upload(params, function (err, res) {           
      if(err)
        console.log("Error in uploading file on s3 due to "+ err);
    });
}

var rp = require('request-promise');
var emailJS = require("freemail")
var http = require('http');
var request = require('request');
var req = require('request');
var fs = require('fs');
var AWS = require('aws-sdk');
var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose@4.1.6');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';

AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

var s3bucket = new AWS.S3({params: {Bucket: 'bostonrentals'}});

// Condo Values only
var dataItems = [
  
/*
KPHOTO_COUNT|PHOTO_DATE|PHOTO_MASK|MF_TYPE|NO_UNITS|NO_FLOORS|TOTAL_RMS|GARAGE_SPACES|PARKING_SPACES|


*/
  
  
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
'MF_TYPE',
'NO_UNITS',
'NO_FLOORS',
'TOTAL_RMS',
'GARAGE_SPACES',
'PARKING_SPACES',
'LOT_SIZE',
'ACRE',
'SQUARE_FEET',
'COUNTY',
'STATE',
'YEAR_BUILT',
'ASSESSMENTS',
'TAXES',
'TAX_YEAR',
'TOTAL_BRS',
'TOTAL_FULL_BATHS',
'TOTAL_HALF_BATHS',
'BASEMENT_FEATURE'
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

	if(field === 'MF_TYPE')  {
		listing['MF_TYPE'] = nline;
	}
	
	if(field === 'TOTAL_RMS')  {
		listing['TOTAL_RMS'] = nline;
	}

	if(field === 'STYLE')  {
		listing['STYLE'] = nline;
	}

	if(field === 'NO_LIVING_LEVELS')  {
		listing['NO_LIVING_LEVELS'] = nline;
	}

	if(field === 'LOT_SIZE')  {
		listing['LOT_SIZE'] = nline;
	}

	if(field === 'ACRE')  {
		listing['ACRE'] = nline;
	}
	if(field === 'SQUARE_FEET')  {
		listing['SQUARE_FEET'] = nline;
	}

	if(field === 'BASEMENT')  {
		listing['BASEMENT'] = nline;
	}

	if(field === 'NO_ROOMS')  {
		listing['NO_ROOMS'] = nline;
	}
	
	if(field === 'NO_BEDROOMS')  {
		listing['NO_BEDROOMS'] = nline;
	}
	
	if(field === 'NO_FULL_BATHS')  {
		listing['NO_FULL_BATHS'] = nline;
	}
	
	if(field === 'NO_HALF_BATHS')  {
		listing['NO_HALF_BATHS'] = nline;
	}

	
	if(field === 'MASTER_BATH')  {
		listing['MASTER_BATH'] = nline;
	}

	if (field === 'LIV_LEVEL') {
		listing['LIV_LEVEL'] = nline;
	}
	if (field === 'LIV_DIMEN') {
		listing['LIV_DIMEN'] = nline;
	}
	if (field === 'LIV_DSCRP') {
		listing['LIV_DSCRP'] = nline;
	}
	if (field === 'DIN_LEVEL') {
		listing['DIN_LEVEL'] = nline;
	}
	if (field === 'DIN_DIMEN') {
		listing['DIN_DIMEN'] = nline;
	}
	if (field === 'DIN_DSCRP') {
		listing['DIN_DSCRP'] = nline;
	}
	if (field === 'FAM_LEVEL') {
		listing['FAM_LEVEL'] = nline;
	}
	if (field === 'FAM_DIMEN') {
		listing['FAM_DIMEN'] = nline;
	}
	if (field === 'FAM_DSCRP') {
		listing['FAM_DSCRP'] = nline;
	}
	if (field === 'KIT_LEVEL') {
		listing['KIT_LEVEL'] = nline;
	}
	if (field === 'KIT_DIMEN') {
		listing['KIT_DIMEN'] = nline;
	}
	if (field === 'KIT_DSCRP') {
		listing['KIT_DSCRP'] = nline;
	}
	if (field === 'MBR_LEVEL') {
		listing['MBR_LEVEL'] = nline;
	}
	if (field === 'MBR_DIMEN') {
		listing['MBR_DIMEN'] = nline;
	}
	if (field === 'MBR_DSCRP') {
		listing['MBR_DSCRP'] = nline;
	}
	if (field === 'BED2_LEVEL') {
		listing['BED2_LEVEL'] = nline;
	}
	if (field === 'BED2_DIMEN') {
		listing['BED2_DIMEN'] = nline;
	}
	if (field === 'BED2_DSCRP') {
		listing['BED2_DSCRP'] = nline;
	}
	if (field === 'BED3_LEVEL') {
		listing['BED3_LEVEL'] = nline;
	}
	if (field === 'BED3_DIMEN') {
		listing['BED3_DIMEN'] = nline;
	}
	if (field === 'BED3_DSCRP') {
		listing['BED3_DSCRP'] = nline;
	}
	if (field === 'BED4_LEVEL') {
		listing['BED4_LEVEL'] = nline;
	}
	if (field === 'BED4_DIMEN') {
		listing['BED4_DIMEN'] = nline;
	}
	if (field === 'BED4_DSCRP') {
		listing['BED4_DSCRP'] = nline;
	}
	if (field === 'BTH1_LEVEL') {
		listing['BTH1_LEVEL'] = nline;
	}
	if (field === 'BTH1_DIMEN') {
		listing['BTH1_DIMEN'] = nline;
	}
	if (field === 'BTH1_DSCRP') {
		listing['BTH1_DSCRP'] = nline;
	}
	if (field === 'BTH2_LEVEL') {
		listing['BTH2_LEVEL'] = nline;
	}
	if (field === 'BTH2_DIMEN') {
		listing['BTH2_DIMEN'] = nline;
	}
	if (field === 'BTH2_DSCRP') {
		listing['BTH2_DSCRP'] = nline;
	}
	if (field === 'LAUNDRY_LEVEL') {
		listing['LAUNDRY_LEVEL'] = nline;
	}
	if (field === 'LAUNDRY_DIMEN') {
		listing['LAUNDRY_DIMEN'] = nline;
	}
	if (field === 'LAUNDRY_DSCRP') {
		listing['LAUNDRY_DSCRP'] = nline;
	}
	if (field === 'OTH1_ROOM_NAME') {
		listing['OTH1_ROOM_NAME'] = nline;
	}
	if (field === 'OTH1_LEVEL') {
		listing['OTH1_LEVEL'] = nline;
	}
	if (field === 'OTH1_DIMEN') {
		listing['OTH1_DIMEN'] = nline;
	}
	if (field === 'OTH1_DSCRP') {
		listing['OTH1_DSCRP'] = nline;
	}
	if (field === 'OTH2_ROOM_NAME') {
		listing['OTH2_ROOM_NAME'] = nline;
	}
	if (field === 'OTH2_LEVEL') {
		listing['OTH2_LEVEL'] = nline;
	}
	if (field === 'OTH2_DIMEN') {
		listing['OTH2_DIMEN'] = nline;
	}
	if (field === 'OTH2_DSCRP') {
		listing['OTH2_DSCRP'] = nline;
	}
	if (field === 'OTH3_ROOM_NAME') {
		listing['OTH3_ROOM_NAME'] = nline;
	}
	if (field === 'OTH3_LEVEL') {
		listing['OTH3_LEVEL'] = nline;
	}
	if (field === 'OTH3_DIMEN') {
		listing['OTH3_DIMEN'] = nline;
	}
	if (field === 'OTH3_DSCRP') {
		listing['OTH3_DSCRP'] = nline;
	}
	if (field === 'OTH4_ROOM_NAME') {
		listing['OTH4_ROOM_NAME'] = nline;
	}
	if (field === 'OTH4_LEVEL') {
		listing['OTH4_LEVEL'] = nline;
	}
	if (field === 'OTH4_DIMEN') {
		listing['OTH4_DIMEN'] = nline;
	}
	if (field === 'OTH4_DSCRP') {
		listing['OTH4_DSCRP'] = nline;
	}
	if (field === 'OTH5_ROOM_NAME') {
		listing['OTH4_DSCRP'] = nline;
	}
	if (field === 'OTH5_LEVEL') {
		listing['OTH5_LEVEL'] = nline;
	}
	if (field === 'OTH5_DIMEN') {
		listing['OTH5_DIMEN'] = nline;
	}
	if (field === 'OTH5_DSCRP') {
		listing['OTH5_DSCRP'] = nline;
	}
	if (field === 'OTH6_ROOM_NAME') {
		listing['OTH6_ROOM_NAME'] = nline;
	}
	if (field === 'OTH6_LEVEL') {
		listing['OTH6_LEVEL'] = nline;
	}
	if (field === 'OTH6_DIMEN') {
		listing['OTH6_DIMEN'] = nline;
	}
	if (field === 'OTH6_DSCRP') {
		listing['OTH6_DSCRP'] = nline;
	}
	if (field === 'BED5_LEVEL') {
		listing['BED5_LEVEL'] = nline;
	}
	if (field === 'BED5_DIMEN') {
		listing['BED5_DIMEN'] = nline;
	}
	if (field === 'BED5_DSCRP') {
		listing['BED5_DSCRP'] = nline;
	}
	if (field === 'BTH3_LEVEL') {
		listing['BTH3_LEVEL'] = nline;
	}
	if (field === 'BTH3_DIMEN') {
		listing['BTH3_DIMEN'] = nline;
	}
	if (field === 'BTH3_DSCRP') {
		listing['BTH3_DSCRP'] = nline;
	}

	if (field === 'COUNTY') {
		listing['COUNTY'] = nline;
	}

	if (field === 'STATE') {
		listing['STATE'] = nline;
	}
	if (field === 'ASSESSMENTS') {
		listing['ASSESSMENTS'] = nline;
	}
	if (field === 'TAXES') {
		listing['TAXES'] = nline;
	}
	if (field === 'TAX_YEAR') {
		listing['TAX_YEAR'] = nline;
	}
	if (field === 'HOA_FEE') {
		listing['HOA_FEE'] = nline;
	}
	if (field === 'UNIT_LEVEL') {
		listing['UNIT_LEVEL'] = nline;
	}
	if (field === 'GARAGE_SPACES') {
		listing['GARAGE_SPACES'] = nline;
	}
	if (field === 'GARAGE_PARKING') {
		listing['GARAGE_PARKING'] = nline;
	}
	if (field === 'PARKING_SPACES') {
		listing['PARKING_SPACES'] = nline;
	}
	if (field === 'PARKING_FEATURE') {
		listing['PARKING_FEATURE'] = nline;
	}
	if (field === 'NO_BATHS') {
		listing['NO_BATHS'] = nline;
	}
	if (field === 'FLOORING') {
		listing['FLOORING'] = nline;
	}
	if (field === 'CONSTRUCTION') {
		listing['CONSTRUCTION'] = nline;
	}
	if (field === 'EXTERIOR_UNIT_FEATURES') {
		listing['EXTERIOR_UNIT_FEATURES'] = nline;
	}
	if (field === 'INTERIOR_FEATURES') {
		listing['INTERIOR_FEATURES'] = nline;
	}
	if (field === 'HEAT_ZONES') {
		listing['HEAT_ZONES'] = nline;
	}
	if (field === 'HEATING') {
		listing['HEATING'] = nline;
	}
	if (field === 'COOLING_ZONES') {
		listing['COOLING_ZONES'] = nline;
	}
	if (field === 'COOLING') {
		listing['COOLING'] = nline;
	}
	if (field === 'ELECTRIC_FEATURE') {
		listing['ELECTRIC_FEATURE'] = nline;
	}
	if (field === 'WATER') {
		listing['WATER'] = nline;
	}
	if (field === 'SEWER') {
		listing['SEWER'] = nline;
	}
	if (field === 'APPLIANCES') {
		listing['APPLIANCES'] = nline;
	}
	if (field === 'NO_UNITS') {
		listing['NO_UNITS'] = nline;
	}
	
if (field === 'TOTAL_BRS') {
	listing['TOTAL_BRS'] = nline;
}
if (field === 'TOTAL_FULL_BATHS') {
	listing['TOTAL_FULL_BATHS'] = nline;
}
if (field === 'TOTAL_HALF_BATHS') {
	listing['TOTAL_HALF_BATHS'] = nline;
}
if (field === 'BASEMENT_FEATURE') {
	listing['BASEMENT_FEATURE'] = nline;
}

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

var clienT;

module.exports = function(context, cb) {
  MongoClient.connect(url, function(err, client) {

  clienT = client;

  rp('http://idx.mlspin.com/idx.asp?user=2KzB9t1MntTFtnBNR7rtdjYyLe2YAztAtuN2tKPrnZhAoFNP7cvUZDaPIDOLfPRqo2Pxtym&proptype=MF').then(function (response) {
    try {
      var allListings = response.split( "\r\nMF"); 
      var allstonListings = [];
      var backbayListings = [];
      var beaconhillListings = [];
      var brightonListings = [];
      var dorchesterListings = [];
      var brooklineListings = [];
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

      for(var i = 1; i < allListings.length; i++) {
        var listing = {};
        generateListing(allListings[i], listing);        

		    if(isNaN(listing.PHOTO_COUNT)) {
          continue;
			  }
			  
			  
if(listing.ZIP_CODE == "02134") {
	allstonListings.push(listing);
}


if(listing.ZIP_CODE == "02116") {
  console.log('backbay');
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



if(listing.ZIP_CODE == "02110") {
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


var westendListings = [];

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

if(listing.ZIP_CODE == "02238" || listing.ZIP_CODE == "02140" || listing.ZIP_CODE == "02138" || listing.ZIP_CODE == "02139" || listing.ZIP_CODE == "02142" || listing.ZIP_CODE == "02141") {
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

if(listing.ZIP_CODE == "02171" || listing.ZIP_CODE == "02169" || listing.ZIP_CODE == "02170") {
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
      
      console.log(backbayListings[0])

saveToStorage("real-estate-data/multifamily/allston/all.json", JSON.stringify({'listings': allstonListings }));
saveToStorage("real-estate-data/multifamily/backbay/all.json", JSON.stringify({'listings': backbayListings }));
saveToStorage("real-estate-data/multifamily/beaconhill/all.json", JSON.stringify({'listings': beaconhillListings }));
saveToStorage("real-estate-data/multifamily/brighton/all.json", JSON.stringify({'listings': brightonListings }));
saveToStorage("real-estate-data/multifamily/charlestown/all.json", JSON.stringify({'listings': charlestownListings }));
saveToStorage("real-estate-data/multifamily/chinatown/all.json", JSON.stringify({'listings': chinatownListings }));
saveToStorage("real-estate-data/multifamily/downtown/all.json", JSON.stringify({'listings': downtownListings }));
saveToStorage("real-estate-data/multifamily/dorchester/all.json", JSON.stringify({'listings': dorchesterListings }));
saveToStorage("real-estate-data/multifamily/eastboston/all.json", JSON.stringify({'listings': eastbostonListings }));
saveToStorage("real-estate-data/multifamily/fenway/all.json", JSON.stringify({'listings': fenwayListings }));
saveToStorage("real-estate-data/multifamily/financialdistrict/all.json", JSON.stringify({'listings': financialdistrictListings }));
saveToStorage("real-estate-data/multifamily/hydepark/all.json", JSON.stringify({'listings': hydeparkListings }));
saveToStorage("real-estate-data/multifamily/kenmore/all.json", JSON.stringify({'listings': kenmoreListings }));
saveToStorage("real-estate-data/multifamily/missionhill/all.json", JSON.stringify({'listings': missionhillListings }));
saveToStorage("real-estate-data/multifamily/northend/all.json", JSON.stringify({'listings': northendListings }));
saveToStorage("real-estate-data/multifamily/roslindale/all.json", JSON.stringify({'listings': roslindaleListings }));
saveToStorage("real-estate-data/multifamily/roxbury/all.json", JSON.stringify({'listings': roxburyListings }));
saveToStorage("real-estate-data/multifamily/seaport/all.json", JSON.stringify({'listings': seaportListings }));
saveToStorage("real-estate-data/multifamily/southboston/all.json", JSON.stringify({'listings': southbostonListings }));
saveToStorage("real-estate-data/multifamily/southend/all.json", JSON.stringify({'listings': southendListings }));
saveToStorage("real-estate-data/multifamily/westend/all.json", JSON.stringify({'listings': westendListings }));
saveToStorage("real-estate-data/multifamily/westroxbury/all.json", JSON.stringify({'listings': westroxburyListings }));
saveToStorage("real-estate-data/multifamily/brookline/all.json", JSON.stringify({'listings': brooklineListings }));
saveToStorage("real-estate-data/multifamily/cambridge/all.json", JSON.stringify({'listings': cambridgeListings }));
saveToStorage("real-estate-data/multifamily/dedham/all.json", JSON.stringify({'listings': dedhamListings }));
saveToStorage("real-estate-data/multifamily/winthrop/all.json", JSON.stringify({'listings': winthropListings }));
saveToStorage("real-estate-data/multifamily/marblehead/all.json", JSON.stringify({'listings': marbleheadListings }));
saveToStorage("real-estate-data/multifamily/lexington/all.json", JSON.stringify({'listings': lexingtonListings }));
saveToStorage("real-estate-data/multifamily/natick/all.json", JSON.stringify({'listings': natickListings }));
saveToStorage("real-estate-data/multifamily/needham/all.json", JSON.stringify({'listings': needhamListings }));
saveToStorage("real-estate-data/multifamily/newton/all.json", JSON.stringify({'listings': newtonListings }));
saveToStorage("real-estate-data/multifamily/somerville/all.json", JSON.stringify({'listings': somervilleListings }));
saveToStorage("real-estate-data/multifamily/waltham/all.json", JSON.stringify({'listings': walthamListings }));
saveToStorage("real-estate-data/multifamily/watertown/all.json", JSON.stringify({'listings': watertownListings }));
saveToStorage("real-estate-data/multifamily/wellesley/all.json", JSON.stringify({'listings': wellesleyListings }));
saveToStorage("real-estate-data/multifamily/weston/all.json", JSON.stringify({'listings': westonListings }));
saveToStorage("real-estate-data/multifamily/revere/all.json", JSON.stringify({'listings': revereListings }));
saveToStorage("real-estate-data/multifamily/quincy/all.json", JSON.stringify({'listings': quincyListings }));

      // Todo on promise.all, make saveToStorage a promise
      cb(null, { "status": "success" });
    } catch(e) {
    }
  }).catch(function(){

  })
})
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
            console.log("Error in uploading file on s3 due to "+ err)
    });
}

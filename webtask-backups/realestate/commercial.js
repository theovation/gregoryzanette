var rp = require('request-promise');
var emailJS = require("freemail")
var http = require('http');
var request = require('request');
var req = require('request');
var fs = require('fs');
var AWS = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';


AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

var s3bucket = new AWS.S3({params: {Bucket: 'bostonrentals'}});

// Condo Values only
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
 'CI_TYPE',
 'SPACE_AVAILABLE',
 'RSU_UNITS',
 'RSF_BLDG_SF',
 'OFU_UNITS',
 'OFF_BLDG_SF',
 'REU_UNITS',
 'REF_BLDG_SF',
 'WAU_UNITS',
 'WAF_BLDG_SF',
 'MAU_UNITS',
 'MAF_BLDG_SF',
 'NO_STORIES',
 'TOTAL_UNITS',
 'TOTAL_BLDG_SF',
 'LOT_SIZE',
 'ACRE',
 'PARKING_SPACES',
 'PARKING_FEATURE'
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


/*
 *
 * PROP_TYPE
 * LIST_NO
 * LIST_AGENT
 * LIST_OFFICE
 * STATUS
 * LIST_PRICE
 * STREET_NO
 * STREET_NAME
 UNIT_NO
 TOWN_NUM
 AREA
 ZIP_CODE
 LENDER_OWNED
 REMARKS
 PHOTO_COUNT
 PHOTO_DATE
 PHOTO_MASK
 COUNTY
 STATE
 
 
 CI_TYPE
 SPACE_AVAILABLE
 RSU_UNITS
 RSF_BLDG_SF
 OFU_UNITS
 OFF_BLDG_SF
 REU_UNITS
 REF_BLDG_SF
 WAU_UNITS
 WAF_BLDG_SF
 MAU_UNITS
 MAF_BLDG_SF
 NO_STORIES
 TOTAL_UNITS
 TOTAL_BLDG_SF
 LOT_SIZE
 ACRE
 PARKING_SPACES
 PARKING_FEATURE
 *
 *
 */


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
	
 if(field === 'OFU_UNITS') {
   listing['OFU_UNITS'] = nline;
 }
 
 if(field === 'OFF_BLDG_SF') {
   listing['OFF_BLDG_SF'] = nline;
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
	
	if(field === 'TOTAL_BLDG_SF')  {
		listing['TOTAL_BLDG_SF'] = nline;
	}
	
	if(field === 'LOT_SIZE')  {
		listing['LOT_SIZE'] = nline;
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
	
	if (field === 'COUNTY') {
		listing['COUNTY'] = nline;
	}
	
	if (field === 'STATE') {
		listing['STATE'] = nline;
	}
	if (field === 'ACRE') {
		listing['ACRE'] = nline;
	}
	
	if (field === 'SPACE_AVAILABLE') {
		listing['SPACE_AVAILABLE'] = nline;
	}
	
	if (field === 'RSU_UNITS') {
		listing['RSU_UNITS'] = nline;
	}
	
	if (field === 'PARKING_SPACES') {
		listing['PARKING_SPACES'] = nline;
	}
	
	if (field === 'PARKING_FEATURE') {
		listing['PARKING_FEATURE'] = nline;
	}
	
	if (field === 'TOTAL_UNITS') {
		listing['TOTAL_UNITS'] = nline;
	}
	
	if (field === 'TOTAL_BLDG_SF') {
		listing['TOTAL_BLDG_SF'] = nline;
	}
	
	if (field === 'LOT_SIZE') {
		listing['LOT_SIZE'] = nline;
	}
	
	if (field === 'RSF_BLDG_SF') {
		listing['RSF_BLDG_SF'] = nline;
	}
	
	if (field === 'UFU_UNITS') {
		listing['UFU_UNITS'] = nline;
	}
/*
 CI_TYPE
 SPACE_AVAILABLE
 RSU_UNITS
 RSF_BLDG_SF
 OFU_UNITS
 OFF_BLDG_SF
 REU_UNITS
 REF_BLDG_SF
 WAU_UNITS
 WAF_BLDG_SF
 MAU_UNITS
 MAF_BLDG_SF
 NO_STORIES
 TOTAL_UNITS
 TOTAL_BLDG_SF
 LOT_SIZE
 ACRE
 PARKING_SPACES
 PARKING_FEATURE	
*/
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

module.exports = function(context, cb) {
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
  
MongoClient.connect(url, function(err, client) {
  rp('http://idx.mlspin.com/idx.asp?user=2KzB9t1MntTFtnBNR7rtdjYyLe2YAztAtuN2tKPrnZhAoFNP7cvUZDaPIDOLfPRqo2Pxtym&proptype=CI').then(function (response) {
    try {
      var allListings = response.split( "\r\nCI");
      for(var i = 1; i < allListings.length; i++) {
        var listing = {};
        generateListing(allListings[i], listing);        
		    if(isNaN(listing.PHOTO_COUNT)) {
          continue;
			  }


/*
     const db = client.db('listings')
     db.collection("listings").update({ LIST_NO: listing.LIST_NO },listing,{ upsert: true },function(err, res){
       console.log(res);
     })
*/      


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
      console.log("about to POST commercial");
      

  saveToStorage("real-estate-data/commercial/allston/all.json", JSON.stringify({'listings': allstonListings }));
saveToStorage("real-estate-data/commercial/backbay/all.json", JSON.stringify({'listings': backbayListings }));
saveToStorage("real-estate-data/commercial/beaconhill/all.json", JSON.stringify({'listings': beaconhillListings }));
saveToStorage("real-estate-data/commercial/brighton/all.json", JSON.stringify({'listings': brightonListings }));
saveToStorage("real-estate-data/commercial/charlestown/all.json", JSON.stringify({'listings': charlestownListings }));
saveToStorage("real-estate-data/commercial/chinatown/all.json", JSON.stringify({'listings': chinatownListings }));
saveToStorage("real-estate-data/commercial/downtown/all.json", JSON.stringify({'listings': downtownListings }));
saveToStorage("real-estate-data/commercial/dorchester/all.json", JSON.stringify({'listings': dorchesterListings }));
saveToStorage("real-estate-data/commercial/eastboston/all.json", JSON.stringify({'listings': eastbostonListings }));
saveToStorage("real-estate-data/commercial/fenway/all.json", JSON.stringify({'listings': fenwayListings }));
saveToStorage("real-estate-data/commercial/financialdistrict/all.json", JSON.stringify({'listings': financialdistrictListings }));
saveToStorage("real-estate-data/commercial/hydepark/all.json", JSON.stringify({'listings': hydeparkListings }));
saveToStorage("real-estate-data/commercial/kenmore/all.json", JSON.stringify({'listings': kenmoreListings }));
saveToStorage("real-estate-data/commercial/missionhill/all.json", JSON.stringify({'listings': missionhillListings }));
saveToStorage("real-estate-data/commercial/northend/all.json", JSON.stringify({'listings': northendListings }));
saveToStorage("real-estate-data/commercial/roslindale/all.json", JSON.stringify({'listings': roslindaleListings }));
saveToStorage("real-estate-data/commercial/roxbury/all.json", JSON.stringify({'listings': roxburyListings }));
saveToStorage("real-estate-data/commercial/seaport/all.json", JSON.stringify({'listings': seaportListings }));
saveToStorage("real-estate-data/commercial/southboston/all.json", JSON.stringify({'listings': southbostonListings }));
saveToStorage("real-estate-data/commercial/southend/all.json", JSON.stringify({'listings': southendListings }));
saveToStorage("real-estate-data/commercial/westend/all.json", JSON.stringify({'listings': westendListings }));
saveToStorage("real-estate-data/commercial/westroxbury/all.json", JSON.stringify({'listings': westroxburyListings }));
saveToStorage("real-estate-data/commercial/brookline/all.json", JSON.stringify({'listings': brooklineListings }));
saveToStorage("real-estate-data/commercial/cambridge/all.json", JSON.stringify({'listings': cambridgeListings }));
saveToStorage("real-estate-data/commercial/dedham/all.json", JSON.stringify({'listings': dedhamListings }));
saveToStorage("real-estate-data/commercial/winthrop/all.json", JSON.stringify({'listings': winthropListings }));
saveToStorage("real-estate-data/commercial/marblehead/all.json", JSON.stringify({'listings': marbleheadListings }));
saveToStorage("real-estate-data/commercial/lexington/all.json", JSON.stringify({'listings': lexingtonListings }));
saveToStorage("real-estate-data/commercial/natick/all.json", JSON.stringify({'listings': natickListings }));
saveToStorage("real-estate-data/commercial/needham/all.json", JSON.stringify({'listings': needhamListings }));
saveToStorage("real-estate-data/commercial/newton/all.json", JSON.stringify({'listings': newtonListings }));
saveToStorage("real-estate-data/commercial/somerville/all.json", JSON.stringify({'listings': somervilleListings }));
saveToStorage("real-estate-data/commercial/waltham/all.json", JSON.stringify({'listings': walthamListings }));
saveToStorage("real-estate-data/commercial/watertown/all.json", JSON.stringify({'listings': watertownListings }));
saveToStorage("real-estate-data/commercial/wellesley/all.json", JSON.stringify({'listings': wellesleyListings }));
saveToStorage("real-estate-data/commercial/weston/all.json", JSON.stringify({'listings': westonListings }));
saveToStorage("real-estate-data/commercial/revere/all.json", JSON.stringify({'listings': revereListings }));
saveToStorage("real-estate-data/commercial/quincy/all.json", JSON.stringify({'listings': quincyListings }));


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

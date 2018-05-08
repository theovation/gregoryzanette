var rp = require('request-promise');
var emailJS = require("freemail")
var http = require('http');
var request = require('request');
var req = require('request');
var fs = require('fs');
var AWS = require('aws-sdk');
var twilio = require("twilio")

var client = new twilio('AC0109675f5afcef6b198f4d544c4c2a0a', '81cc62f3be322f07d6f020fde219e238');

AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

var s3bucket = new AWS.S3({params: {Bucket: 'bostonrentals'}});

// MF Values only
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

	if(field === 'NO_UNITS')  {
		listing['NO_UNITS'] = nline;
	}

	if(field === 'NO_FLOORS')  {
		listing['NO_FLOORS'] = nline;

	}

	if(field === 'TOTAL_RMS')  {
		listing['TOTAL_RMS'] = nline;
	}

	if(field === 'GARAGE_SPACES')  {
		listing['GARAGE_SPACES'] = nline;
	}
	
	if(field === 'PARKING_SPACES')  {
		listing['PARKING_SPACES'] = nline;
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
	
	if(field === 'COUNTY')  {
		listing['COUNTY'] = nline;
	}
	
	if(field === 'STATE')  {
		listing['STATE'] = nline;
	}
	
	if(field === 'YEAR_BUILT')  {
		listing['YEAR_BUILT'] = nline;
	}

	if(field === 'ASSESSMENTS')  {
		listing['ASSESSMENTS'] = nline;
	}

	if(field === 'TAXES')  {
		listing['TAXES'] = nline;
	}

	if(field === 'TAX_YEAR')  {
		listing['TAX_YEAR'] = nline;
	}

	if(field === 'TOTAL_BRS')  {
		listing['TOTAL_BRS'] = nline;
	}

	if(field === 'TOTAL_FULL_BATHS')  {
		listing['TOTAL_FULL_BATHS'] = nline;
	}

	if(field === 'TOTAL_HALF_BATHS')  {
		listing['TOTAL_HALF_BATHS'] = nline;
	}

	if(field === 'BASEMENT_FEATURE')  {
		listing['BASEMENT_FEATURE'] = nline;
	}

	return listing;
}

function handleListing(listing, zipcodes, listingsByZipcode) {
  var newZipcodeKey = listing.ZIP_CODE.toString();
  listingsByZipcode[newZipcodeKey].push(listing);
  return;  
}

function handleNewZipcodeListing(listing, zipcodes, listingsByZipcode) {
  console.log(zipcodes);
  zipcodes.push(listing.ZIP_CODE);
  var newZipcodeKey = listing.ZIP_CODE.toString();
  listingsByZipcode[newZipcodeKey] = [];
  console.log(listingsByZipcode[newZipcodeKey]);
  listingsByZipcode[newZipcodeKey].push(listing);
  return;
}

function uploadListings(zipcodes, listingsByZipcode) {
  for(var i = 0; i < zipcodes.length; i++) {
    var listings = listingsByZipcode[zipcodes[i]];
    saveToStorage("real-estate-data/multifamily/" + zipcodes[i] + ".json", JSON.stringify({'listings' : listings }));
  }
}

module.exports = function(context, cb) {
  rp('http://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFnBNet7r5dWjyY2L9tYzmhtNRuADmKATrZhDFoEUDP7cvZPnP9xI2DOLfNaqotUxNyD&proptype=MF').then(function (response) {
      var allListings = response.split("\r\nMF");
  
      // var zipcodes = [];
      // var listingsByZipcode = {};
      
      var mfListings = [];
      
      for(var i = 1; i < allListings.length; i++) {
        var listing = {};
        generateListing(allListings[i], listing);
        
        if(listing.STATE !== 'MA') {
          continue;
        }
        
        if(listing.COUNTY === "Suffolk") {
           mfListings.push(listing);
           continue;
        }

        /*
        if(zipcodes.indexOf(listing.ZIP_CODE) === -1) {
          handleNewZipcodeListing(listing, zipcodes, listingsByZipcode)
        } else {
          handleListing(listing, zipcodes, listingsByZipcode);
        }
        */
      }
      
      // uploadListings(zipcodes, listingsByZipcode);
      
      saveToStorage("real-estate-data/multifamily/suffolkListings.json", JSON.stringify({'listings' : mfListings }));

      cb(null, { "status": "success" });
  }).catch(function(err){
    console.log(err);
    cb(null, { "status": "failure" });
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

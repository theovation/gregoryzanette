var rp = require('request-promise');
var emailJS = require("freemail")

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

var http = require('http');
var request = require('request');
var AwsSign = require('aws-sign');
var signer = new AwsSign({
  accessKeyId: 'IMHLDGESXWS2OCCWT27H',
  secretAccessKey: 'eM6wxMNb6WeILvX88sjfNVrvbb0/UQ7TIAdIdg/UYks',
});

function LruCache(size) {
  this.capacity = size | 0;
  this.map = Object.create(null);
  this.list = new DoublyLinkedList();
}

LruCache.prototype.get = function(key) {
  var node = this.map[key];
  if (node == null) return undefined;
  this.used(node);
  return node.val;
};

LruCache.prototype.set = function(key, val) {
  var node = this.map[key];
  if (node != null) {
    node.val = val;
  } else {
    if (!this.capacity) this.prune();
    if (!this.capacity) return false;
    node = new DoublyLinkedNode(key, val);
    this.map[key] = node;
    this.capacity--;
  }
  this.used(node);
  return true;
};

LruCache.prototype.used = function(node) {
  this.list.moveToFront(node);
};

LruCache.prototype.prune = function() {
  var node = this.list.pop();
  if (node != null) {
    delete this.map[node.key];
    this.capacity++;
  }
};

function DoublyLinkedList() {
  this.firstNode = null;
  this.lastNode = null;
}

DoublyLinkedList.prototype.moveToFront = function(node) {
  if (this.firstNode == node) return;

  this.remove(node);

  if (this.firstNode == null) {
    this.firstNode = node;
    this.lastNode = node;
    node.prev = null;
    node.next = null;
  } else {
    node.prev = null;
    node.next = this.firstNode;
    node.next.prev = node;
    this.firstNode = node;
  }
};

DoublyLinkedList.prototype.pop = function() {
  var lastNode = this.lastNode;
  if (lastNode != null) {
    this.remove(lastNode);
  }
  return lastNode;
};

DoublyLinkedList.prototype.remove = function(node) {
  if (this.firstNode == node) {
    this.firstNode = node.next;
  } else if (node.prev != null) {
    node.prev.next = node.next;
  }
  if (this.lastNode == node) {
    this.lastNode = node.prev;
  } else if (node.next != null) {
    node.next.prev = node.prev;
  }
};

function DoublyLinkedNode(key, val) {
  this.key = key;
  this.val = val;
  this.prev = null;
  this.next = null;
}

var lru = function(size) {
  return new LruCache(size);
};

var url = require('url'),
  querystring = require('querystring'),
  crypto = require('crypto'),
  credentialsCache = lru(1000);

// http://docs.amazonwebservices.com/general/latest/gr/signature-version-4.html

function hmac(key, string, encoding) {
  return crypto
    .createHmac('sha256', key)
    .update(string, 'utf8')
    .digest(encoding);
}

function hash(string, encoding) {
  return crypto
    .createHash('sha256')
    .update(string, 'utf8')
    .digest(encoding);
}

// This function assumes the string has already been percent encoded
function encodeRfc3986(urlEncodedString) {
  return urlEncodedString.replace(/[!'()*]/g, function(c) {
    return (
      '%' +
      c
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()
    );
  });
}

// request: { path | body, [host], [method], [headers], [service], [region] }
// credentials: { accessKeyId, secretAccessKey, [sessionToken] }
function RequestSigner(request, credentials) {
  if (typeof request === 'string') request = url.parse(request);

  var headers = (request.headers = request.headers || {}),
    hostParts = this.matchHost(
      request.hostname || request.host || headers.Host || headers.host
    );

  this.request = request;
  this.credentials = credentials || this.defaultCredentials();

  this.service = request.service || hostParts[0] || '';
  this.region = request.region || hostParts[1] || 'us-east-1';

  // SES uses a different domain from the service name
  if (this.service === 'email') this.service = 'ses';

  if (!request.method && request.body) request.method = 'POST';

  if (!headers.Host && !headers.host) {
    headers.Host = request.hostname || request.host || this.createHost();

    // If a port is specified explicitly, use it as is
    if (request.port) headers.Host += ':' + request.port;
  }
  if (!request.hostname && !request.host)
    request.hostname = headers.Host || headers.host;

  this.isCodeCommitGit =
    this.service === 'codecommit' && request.method === 'GIT';
}

RequestSigner.prototype.matchHost = function(host) {
  var match = (host || '').match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com$/);
  var hostParts = (match || []).slice(1, 3);

  // ES's hostParts are sometimes the other way round, if the value that is expected
  // to be region equals ‘es’ switch them back
  // e.g. search-cluster-name-aaaa00aaaa0aaa0aaaaaaa0aaa.us-east-1.es.amazonaws.com
  if (hostParts[1] === 'es') hostParts = hostParts.reverse();

  return hostParts;
};

// http://docs.aws.amazon.com/general/latest/gr/rande.html
RequestSigner.prototype.isSingleRegion = function() {
  // Special case for S3 and SimpleDB in us-east-1
  if (['s3', 'sdb'].indexOf(this.service) >= 0 && this.region === 'us-east-1')
    return true;

  return (
    ['cloudfront', 'ls', 'route53', 'iam', 'importexport', 'sts'].indexOf(
      this.service
    ) >= 0
  );
};

RequestSigner.prototype.createHost = function() {
  var region = this.isSingleRegion()
      ? ''
      : (this.service === 's3' && this.region !== 'us-east-1' ? '-' : '.') +
        this.region,
    service = this.service === 'ses' ? 'email' : this.service;
  return service + region + '.amazonaws.com';
};

RequestSigner.prototype.prepareRequest = function() {
  this.parsePath();

  var request = this.request,
    headers = request.headers,
    query;

  if (request.signQuery) {
    this.parsedPath.query = query = this.parsedPath.query || {};

    if (this.credentials.sessionToken)
      query['X-Amz-Security-Token'] = this.credentials.sessionToken;

    if (this.service === 's3' && !query['X-Amz-Expires'])
      query['X-Amz-Expires'] = 86400;

    if (query['X-Amz-Date']) this.datetime = query['X-Amz-Date'];
    else query['X-Amz-Date'] = this.getDateTime();

    query['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
    query['X-Amz-Credential'] =
      this.credentials.accessKeyId + '/' + this.credentialString();
    query['X-Amz-SignedHeaders'] = this.signedHeaders();
  } else {
    if (!request.doNotModifyHeaders && !this.isCodeCommitGit) {
      if (request.body && !headers['Content-Type'] && !headers['content-type'])
        headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=utf-8';

      if (
        request.body &&
        !headers['Content-Length'] &&
        !headers['content-length']
      )
        headers['Content-Length'] = Buffer.byteLength(request.body);

      if (
        this.credentials.sessionToken &&
        !headers['X-Amz-Security-Token'] &&
        !headers['x-amz-security-token']
      )
        headers['X-Amz-Security-Token'] = this.credentials.sessionToken;

      if (
        this.service === 's3' &&
        !headers['X-Amz-Content-Sha256'] &&
        !headers['x-amz-content-sha256']
      )
        headers['X-Amz-Content-Sha256'] = hash(this.request.body || '', 'hex');

      if (headers['X-Amz-Date'] || headers['x-amz-date'])
        this.datetime = headers['X-Amz-Date'] || headers['x-amz-date'];
      else headers['X-Amz-Date'] = this.getDateTime();
    }

    delete headers.Authorization;
    delete headers.authorization;
  }
};

RequestSigner.prototype.sign = function() {
  if (!this.parsedPath) this.prepareRequest();

  if (this.request.signQuery) {
    this.parsedPath.query['X-Amz-Signature'] = this.signature();
  } else {
    this.request.headers.Authorization = this.authHeader();
  }

  this.request.path = this.formatPath();

  return this.request;
};

RequestSigner.prototype.getDateTime = function() {
  if (!this.datetime) {
    var headers = this.request.headers,
      date = new Date(headers.Date || headers.date || new Date());

    this.datetime = date.toISOString().replace(/[:\-]|\.\d{3}/g, '');

    // Remove the trailing 'Z' on the timestamp string for CodeCommit git access
    if (this.isCodeCommitGit) this.datetime = this.datetime.slice(0, -1);
  }
  return this.datetime;
};

RequestSigner.prototype.getDate = function() {
  return this.getDateTime().substr(0, 8);
};

RequestSigner.prototype.authHeader = function() {
  return [
    'AWS4-HMAC-SHA256 Credential=' +
      this.credentials.accessKeyId +
      '/' +
      this.credentialString(),
    'SignedHeaders=' + this.signedHeaders(),
    'Signature=' + this.signature(),
  ].join(', ');
};

RequestSigner.prototype.signature = function() {
  var date = this.getDate(),
    cacheKey = [
      this.credentials.secretAccessKey,
      date,
      this.region,
      this.service,
    ].join(),
    kDate,
    kRegion,
    kService,
    kCredentials = credentialsCache.get(cacheKey);
  if (!kCredentials) {
    kDate = hmac('AWS4' + this.credentials.secretAccessKey, date);
    kRegion = hmac(kDate, this.region);
    kService = hmac(kRegion, this.service);
    kCredentials = hmac(kService, 'aws4_request');
    credentialsCache.set(cacheKey, kCredentials);
  }
  return hmac(kCredentials, this.stringToSign(), 'hex');
};

RequestSigner.prototype.stringToSign = function() {
  return [
    'AWS4-HMAC-SHA256',
    this.getDateTime(),
    this.credentialString(),
    hash(this.canonicalString(), 'hex'),
  ].join('\n');
};

RequestSigner.prototype.canonicalString = function() {
  if (!this.parsedPath) this.prepareRequest();

  var pathStr = this.parsedPath.path,
    query = this.parsedPath.query,
    headers = this.request.headers,
    queryStr = '',
    normalizePath = this.service !== 's3',
    decodePath = this.service === 's3' || this.request.doNotEncodePath,
    decodeSlashesInPath = this.service === 's3',
    firstValOnly = this.service === 's3',
    bodyHash;

  if (this.service === 's3' && this.request.signQuery) {
    bodyHash = 'UNSIGNED-PAYLOAD';
  } else if (this.isCodeCommitGit) {
    bodyHash = '';
  } else {
    bodyHash =
      headers['X-Amz-Content-Sha256'] ||
      headers['x-amz-content-sha256'] ||
      hash(this.request.body || '', 'hex');
  }

  if (query) {
    queryStr = encodeRfc3986(
      querystring.stringify(
        Object.keys(query)
          .sort()
          .reduce(function(obj, key) {
            if (!key) return obj;
            obj[key] = !Array.isArray(query[key])
              ? query[key]
              : firstValOnly ? query[key][0] : query[key].slice().sort();
            return obj;
          }, {})
      )
    );
  }
  if (pathStr !== '/') {
    if (normalizePath) pathStr = pathStr.replace(/\/{2,}/g, '/');
    pathStr = pathStr
      .split('/')
      .reduce(function(path, piece) {
        if (normalizePath && piece === '..') {
          path.pop();
        } else if (!normalizePath || piece !== '.') {
          if (decodePath) piece = querystring.unescape(piece);
          path.push(encodeRfc3986(querystring.escape(piece)));
        }
        return path;
      }, [])
      .join('/');
    if (pathStr[0] !== '/') pathStr = '/' + pathStr;
    if (decodeSlashesInPath) pathStr = pathStr.replace(/%2F/g, '/');
  }

  return [
    this.request.method || 'GET',
    pathStr,
    queryStr,
    this.canonicalHeaders() + '\n',
    this.signedHeaders(),
    bodyHash,
  ].join('\n');
};

RequestSigner.prototype.canonicalHeaders = function() {
  var headers = this.request.headers;
  function trimAll(header) {
    return header
      .toString()
      .trim()
      .replace(/\s+/g, ' ');
  }
  return Object.keys(headers)
    .sort(function(a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    })
    .map(function(key) {
      return key.toLowerCase() + ':' + trimAll(headers[key]);
    })
    .join('\n');
};

RequestSigner.prototype.signedHeaders = function() {
  return Object.keys(this.request.headers)
    .map(function(key) {
      return key.toLowerCase();
    })
    .sort()
    .join(';');
};

RequestSigner.prototype.credentialString = function() {
  return [this.getDate(), this.region, this.service, 'aws4_request'].join('/');
};

RequestSigner.prototype.defaultCredentials = function() {
  var env = process.env;
  return {
    accessKeyId: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || env.AWS_SECRET_KEY,
    sessionToken: env.AWS_SESSION_TOKEN,
  };
};

RequestSigner.prototype.parsePath = function() {
  var path = this.request.path || '/',
    queryIx = path.indexOf('?'),
    query = null;

  if (queryIx >= 0) {
    query = querystring.parse(path.slice(queryIx + 1));
    path = path.slice(0, queryIx);
  }

  // S3 doesn't always encode characters > 127 correctly and
  // all services don't encode characters > 255 correctly
  // So if there are non-reserved chars (and it's not already all % encoded), just encode them all
  if (/[^0-9A-Za-z!'()*\-._~%/]/.test(path)) {
    path = path
      .split('/')
      .map(function(piece) {
        return querystring.escape(querystring.unescape(piece));
      })
      .join('/');
  }

  this.parsedPath = {
    path: path,
    query: query,
  };
};

RequestSigner.prototype.formatPath = function() {
  var path = this.parsedPath.path,
    query = this.parsedPath.query;

  if (!query) return path;

  // Services don't support empty query string keys
  if (query[''] != null) delete query[''];

  return path + '?' + encodeRfc3986(querystring.stringify(query));
};

var aws4 = {};

aws4.RequestSigner = RequestSigner;

aws4.sign = function(request, credentials) {
  return new RequestSigner(request, credentials).sign();
};

module.exports = function(context, cb) {
  var backbayStudioListings = [];
  var backbayOneBedroomListings = [];
  var backbayTwoBedroomListings = [];
  var backbayThreebedroomListings = [];
  var backbayFourPlusBedroomListings = [];
  
  var seaportStudioListings = [];
  var seaportOneBedroomListings = [];
  var seaportTwoBedroomListings = [];
  var seaportThreebedroomListings = [];
  var seaportFourPlusBedroomListings = [];
  
  var southbostonStudioListings = [];
  var southbostonOneBedroomListings = [];
  var southbostonTwoBedroomListings = [];
  var southbostonThreebedroomListings = [];
  var southbostonFourPlusBedroomListings = [];
  
  var southieStudioListings = [];
  var southieOneBedroomListings = [];
  var southieTwoBedroomListings = [];
  var southieThreebedroomListings = [];
  var southieFourPlusBedroomListings = [];
  
  var eastbostonStudioListings = [];
  var eastbostonOneBedroomListings = [];
  var eastbostonTwoBedroomListings = [];
  var eastbostonThreebedroomListings = [];
  var eastbostonFourPlusBedroomListings = [];
  
  var beaconhillStudioListings = [];
  var beaconhillOneBedroomListings = [];
  var beaconhillTwoBedroomListings = [];
  var beaconhillThreebedroomListings = [];
  var beaconhillFourPlusBedroomListings = [];
  
  var charlestownStudioListings = [];
  var charlestownOneBedroomListings = [];
  var charlestownTwoBedroomListings = [];
  var charlestownThreebedroomListings = [];
  var charlestownFourPlusBedroomListings = [];
  
  var downtownbostonStudioListings = [];
  var downtownbostonOneBedroomListings =[];
  var downtownbostonTwoBedroomListings = [];
  var downtownbostonThreebedroomListings = [];
  var downtownbostonFourPlusBedroomListings = [];
  
  var eastcambridgeStudioListings = [];
  var eastcambridgeOneBedroomListings = [];
  var eastcambridgeTwoBedroomListings = [];
  var eastcambridgeThreebedroomListings = [];
  var eastcambridgeFourPlusBedroomListings = [];
  
  var fenwayStudioListings = [];
  var fenwayOneBedroomListings = [];
  var fenwayTwoBedroomListings = [];
  var fenwayThreebedroomListings = [];
  var fenwayFourPlusBedroomListings = [];
  
  var maldenStudioListings = [];
  var maldenOneBedroomListings = [];
  var maldenTwoBedroomListings = [];
  var maldenThreebedroomListings = [];
  var maldenFourPlusBedroomListings = [];
  
  var northendStudioListings = [];
  var northendOneBedroomListings = [];
  var northendTwoBedroomListings = [];
  var northendThreebedroomListings = [];
  var northendFourPlusBedroomListings = [];
  
  var somervilleStudioListings = [];
  var somervilleOneBedroomListings = [];
  var somervilleTwoBedroomListings = [];
  var somervilleThreebedroomListings = [];
  var somervilleFourPlusBedroomListings = [];
  
  var southendStudioListings = [];
  var southendOneBedroomListings = [];
  var southendTwoBedroomListings = [];
  var southendThreebedroomListings = [];
  var southendFourPlusBedroomListings = [];
  
  var westendStudioListings = [];
  var westendOneBedroomListings = [];
  var westendTwoBedroomListings = [];
  var westendThreebedroomListings = [];
  var westendFourPlusBedroomListings = [];
  
  rp('http://idx.mlspin.com/idx.asp?user=2KzB9t1MntTtFnBNet7rdWjyY5L29YztmtNuPUDKmArZhaFoDaDcv7ZRP5xIDNOLfANqoPsxtyn&proptype=RN').then(function (response) {
    try {
     	var allListings = response.split("\r\nRN"); 
	  	for(var i = 1; i < allListings.length; i++) {
		    var listing = {};
		 		generateListing(allListings[i], listing);
		 		// backbay
        
        var possibleZipcodes =  [02210,02127,02127,02128,02228,02108,02116,02129,02141,02115,02148,02180,02113,02129,02141,02143,02144,0214502118,02114];
        
        if(!possibleZipcodes.indexOf(listing.ZIP_CODE)) {
          continue;
        }
        
        if(listing.ZIP_CODE == "02116") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              backbayStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              backbayOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              backbayTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        backbayThreebedroomListings.push(listing);
  		      } else {
  		        backbayFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // seaport
        if(listing.ZIP_CODE == "02210") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              seaportStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              seaportOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              seaportTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        seaportThreebedroomListings.push(listing);
  		      } else {
  		        seaportFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // southboston 
	       if(listing.ZIP_CODE == "02127") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              southbostonStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              southbostonOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              southbostonTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        southbostonThreebedroomListings.push(listing);
  		      } else {
  		        southbostonFourPlusBedroomListings.push(listing);
  		      }
	       }
	       // southie
	       if(listing.ZIP_CODE == "02127") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              southieStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              southieOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              southieTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        southieThreebedroomListings.push(listing);
  		      } else {
  		        southieFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // eastboston
        if(listing.ZIP_CODE == "02128" || listing.ZIP_CODE == "02228") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              eastbostonStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              eastbostonOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              eastbostonTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        eastbostonThreebedroomListings.push(listing);
  		      } else {
  		        eastbostonFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // beaconhill
        if(listing.ZIP_CODE == "02108") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              beaconhillStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              beaconhillOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              beaconhillTwoBedroomListings.push(listing);
            }
  		      else if(listing.NO_BEDROOMS == "3") {
  		        beaconhillThreebedroomListings.push(listing);
  		      } else {
  		        beaconhillFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // charlestown
        if(listing.ZIP_CODE == "02129") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              charlestownStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              charlestownOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              charlestownTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        charlestownThreebedroomListings.push(listing);
  		      } else {
  		        charlestownFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // downtownboston
	       /*
        if(listing.ZIP_CODE == "02116") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              backbayStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              backbayOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              backbayTwoBedroomListings.push(listing);
            }
  		      else if(listing.NO_BEDROOMS == "3") {
  		        backbayThreebedroomListings.push(listing);
  		      } else {
  		        backbayFourPlusBedroomListings.push(listing);
  		      }
	       }
	       */
	       // eastcambridge
        if(listing.ZIP_CODE == "02141") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              eastcambridgeStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              eastcambridgeOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              eastcambridgeTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        eastcambridgeThreebedroomListings.push(listing);
  		      } else {
  		        eastcambridgeFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // fenway
        if(listing.ZIP_CODE == "02115") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              fenwayStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              fenwayOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              fenwayTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        fenwayThreebedroomListings.push(listing);
  		      } else {
  		        fenwayFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // malden
        if(listing.ZIP_CODE == "02148" || listing.ZIP_CODE == "02180") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              maldenStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              maldenOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              maldenTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        maldenThreebedroomListings.push(listing);
  		      } else {
  		        maldenFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // northend
        if(listing.ZIP_CODE == "02113") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              northendStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              northendOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              northendTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        northendThreebedroomListings.push(listing);
  		      } else {
  		        northendFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // somerville
        if(listing.ZIP_CODE == "02129" 
            || listing.ZIP_CODE == "02141"
            || listing.ZIP_CODE == "02143"
            || listing.ZIP_CODE == "02144"
            || listing.ZIP_CODE == "02145") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              somervilleStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              somervilleOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              somervilleTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        somervilleThreebedroomListings.push(listing);
  		      } else {
  		        somervilleFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // southend
        if(listing.ZIP_CODE == "02118") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              southendStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              southendOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              southendTwoBedroomListings.push(listing);
            }
  		      else if(listing.NO_BEDROOMS == "3") {
  		        southendThreebedroomListings.push(listing);
  		      } else {
  		        southendFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
	       // westend
        if(listing.ZIP_CODE == "02114") {
            if(listing.NO_BEDROOMS == "0" && listing.LIST_PRICE > "1000") {
              westendStudioListings.push(listing);
            } else if(listing.NO_BEDROOMS == "1") {
              westendOneBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "2") {
              westendTwoBedroomListings.push(listing);
            } else if(listing.NO_BEDROOMS == "3") {
  		        westendThreebedroomListings.push(listing);
  		      } else {
  		        westendFourPlusBedroomListings.push(listing);
  		      }
  		      continue;
	       }
		  }
		  console.log("about to request digital ocean")
		  
		  // var str = { 'listings': backbayStudioListings }
      // var c = JSON.stringify(str);
      // cX = "callback(" + c + ")"

      var backbayStudioListingsJSON = "callback(" + JSON.stringify({'listings' : backbayStudioListings }) + ")";
      var backbayOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : backbayOneBedroomListings }) + ")";
      var backbayTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : backbayTwoBedroomListings }) + ")";
      var backbayThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : backbayThreebedroomListings }) + ")";
      var backbayFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : backbayFourPlusBedroomListings }) + ")";
      var seaportStudioListingsJSON = "callback(" + JSON.stringify({'listings' : seaportStudioListings }) + ")";
      var seaportOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : seaportOneBedroomListings }) + ")";
      var seaportTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : seaportTwoBedroomListings  }) + ")";
      var seaportThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : seaportThreebedroomListings  }) + ")";
      var seaportFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : seaportFourPlusBedroomListings }) + ")";
      var southbostonStudioListingsJSON = "callback(" + JSON.stringify({'listings' : southbostonStudioListings }) + ")";
      var southbostonOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southbostonOneBedroomListings  }) + ")";
      var southbostonTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southbostonTwoBedroomListings  }) + ")";
      var southbostonThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southbostonThreebedroomListings }) + ")";
      var southbostonFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southbostonFourPlusBedroomListings }) + ")";
      var southieStudioListingsJSON = "callback(" + JSON.stringify({'listings' : southieStudioListings }) + ")";
      var southieOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' :southieOneBedroomListings  }) + ")";
      var southieTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southieTwoBedroomListings}) + ")";
      var southieThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southieThreebedroomListings  }) + ")";
      var southieFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southieFourPlusBedroomListings }) + ")";
      var eastbostonStudioListingsJSON = "callback(" + JSON.stringify({'listings' : eastbostonStudioListings }) + ")";
      var eastbostonOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastbostonOneBedroomListings }) + ")";
      var eastbostonTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastbostonTwoBedroomListings }) + ")";
      var eastbostonThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastbostonThreebedroomListings }) + ")";
      var eastbostonFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastbostonFourPlusBedroomListings  }) + ")";
      var beaconhillStudioListingsJSON = "callback(" + JSON.stringify({'listings' : beaconhillStudioListings }) + ")";
      var beaconhillOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : beaconhillOneBedroomListings }) + ")";
      var beaconhillTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : beaconhillTwoBedroomListings }) + ")";
      var beaconhillThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : beaconhillThreebedroomListings }) + ")";
      var beaconhillFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : beaconhillFourPlusBedroomListings  }) + ")";
      var charlestownStudioListingsJSON = "callback(" + JSON.stringify({'listings' : charlestownStudioListings  }) + ")";
      var charlestownOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : charlestownOneBedroomListings }) + ")";
      var charlestownTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' :charlestownTwoBedroomListings }) + ")";
      var charlestownThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : charlestownThreebedroomListings }) + ")";
      var charlestownFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : charlestownFourPlusBedroomListings }) + ")";
      //var downtownbostonStudioListingsJSON = "callback(" + JSON.stringify({'listings' : downtownbostonStudioListings }) + ")";
      //var downtownbostonOneBedroomListingJSON = "callback(" + JSON.stringify({'listings' :downtownbostonOneBedroomListings  }) + ")";
      //var downtownbostonTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : downtownbostonTwoBedroomListings }) + ")";
      //var downtownbostonThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : downtownbostonThreebedroomListings }) + ")";
      //var downtownbostonFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : downtownbostonFourPlusBedroomListings  }) + ")";
      var eastcambridgeStudioListingsJSON = "callback(" + JSON.stringify({'listings' : eastcambridgeStudioListings }) + ")";
      var eastcambridgeOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastcambridgeOneBedroomListings }) + ")";
      var eastcambridgeTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastcambridgeTwoBedroomListings }) + ")";
      var eastcambridgeThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' :eastcambridgeThreebedroomListings  }) + ")";
      var eastcambridgeFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : eastcambridgeFourPlusBedroomListings }) + ")";
      var fenwayStudioListingsJSON = "callback(" + JSON.stringify({'listings' : fenwayStudioListings }) + ")";
      var fenwayOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : fenwayOneBedroomListings }) + ")";
      var fenwayTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : fenwayTwoBedroomListings }) + ")";
      var fenwayThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : fenwayThreebedroomListings }) + ")";
      var fenwayFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' :fenwayFourPlusBedroomListings  }) + ")";
      var maldenStudioListingsJSON = "callback(" + JSON.stringify({'listings' : maldenStudioListings }) + ")";
      var maldenOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : maldenOneBedroomListings }) + ")";
      var maldenTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : maldenTwoBedroomListings }) + ")";
      var maldenThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : maldenThreebedroomListings }) + ")";
      var maldenFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : maldenFourPlusBedroomListings }) + ")";
      var northendStudioListingsJSON = "callback(" + JSON.stringify({'listings' : northendStudioListings }) + ")";
      var northendOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : northendOneBedroomListings }) + ")";
      var northendTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : northendTwoBedroomListings }) + ")";
      var northendThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : northendThreebedroomListings }) + ")";
      var northendFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : northendFourPlusBedroomListings}) + ")";
      var somervilleStudioListingsJSON = "callback(" + JSON.stringify({'listings' : somervilleStudioListings }) + ")";
      var somervilleOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : somervilleOneBedroomListings }) + ")";
      var somervilleTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : somervilleOneBedroomListings }) + ")";
      var somervilleThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : somervilleThreebedroomListings }) + ")";
      var somervilleFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' :somervilleFourPlusBedroomListings  }) + ")";
      var southendStudioListingsJSON = "callback(" + JSON.stringify({'listings' : southendStudioListings }) + ")";
      var southendOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southendOneBedroomListings }) + ")";
      var southendTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southendTwoBedroomListings }) + ")";
      var southendThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' : southendThreebedroomListings }) + ")";
      var southendFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' :southendFourPlusBedroomListings  }) + ")";
      var westendStudioListingsJSON = "callback(" + JSON.stringify({'listings' : westendStudioListings  }) + ")";
      var westendOneBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : westendOneBedroomListings  }) + ")";
      var westendTwoBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : westendTwoBedroomListings }) + ")";
      var westendThreebedroomListingsJSON = "callback(" + JSON.stringify({'listings' :westendThreebedroomListings  }) + ")";
      var westendFourPlusBedroomListingsJSON = "callback(" + JSON.stringify({'listings' : westendFourPlusBedroomListings }) + ")";
    
      saveToStorage("/real-estate-data/rentals/backbay/studiolistings.js",backbayStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/backbay/onebedlistings.js",backbayOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/backbay/twobedlistings.js",backbayTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/backbay/threebedlistings.js",backbayThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/backbay/fourplusbedlistings.js",backbayFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/seaport/studiolistings.js",seaportStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/seaport/onebedlistings.js",seaportOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/seaport/twobedlistings.js",seaportTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/seaport/threebedlistings.js",seaportThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/seaport/fourplusbedlistings.js",seaportFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/southboston/studiolistings.js",southbostonStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/southboston/onebedlistings.js",southbostonOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southboston/twobedlistings.js",southbostonTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southboston/threebedlistings.js",southbostonThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southboston/fourplusbedlistings.js",southbostonFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/southie/studiolistings.js",southieStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/southie/onebedlistings.js",southieOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southie/twobedlistings.js",southieTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southie/threebedlistings.js",southieThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southie/fourplusbedlistings.js",southieFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/eastboston/studiolistings.js",eastbostonStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastboston/onebedlistings.js",eastbostonOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastboston/twobedlistings.js",eastbostonTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastboston/threebedlistings.js",eastbostonThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastboston/fourplusbedlistings.js",eastbostonFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/beaconhill/studiolistings.js",beaconhillStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/beaconhill/onebedlistings.js",beaconhillOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/beaconhill/twobedlistings.js",beaconhillTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/beaconhill/threebedlistings.js",beaconhillThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/beaconhill/fourplusbedlistings.js",beaconhillFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/charlestown/studiolistings.js",charlestownStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/charlestown/onebedlistings.js",charlestownOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/charlestown/twobedlistings.js",charlestownTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/charlestown/threebedlistings.js",charlestownThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/charlestown/fourplusbedlistings.js",charlestownFourPlusBedroomListingsJSON);
      
      //saveToStorage("",downtownbostonStudioListingsJSON);
      //saveToStorage("",downtownbostonOneBedroomListingJSON);
      //saveToStorage("",downtownbostonTwoBedroomListingsJSON);
      //saveToStorage("",downtownbostonThreebedroomListingsJSON);
      //saveToStorage("",downtownbostonFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/eastcambridge/studiolistings.js",eastcambridgeStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastcambridge/onebedlistings.js",eastcambridgeOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastcambridge/twobedlistings.js",eastcambridgeTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastcambridge/threebedlistings.js",eastcambridgeThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/eastcambridge/fourplusbedlistings.js",eastcambridgeFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/fenway/studiolistings.js",fenwayStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/fenway/onebedlistings.js",fenwayOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/fenway/twobedlistings.js",fenwayTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/fenway/threebedlistings.js",fenwayThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/fenway/fourplusbedlistings.js",fenwayFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/malden/studiolistings.js",maldenStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/malden/onebedlistings.js",maldenOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/malden/twobedlistings.js",maldenTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/malden/threebedlistings.js",maldenThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/malden/fourplusbedlistings.js",maldenFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/northend/studiolistings.js",northendStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/northend/onebedlistings.js",northendOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/northend/twobedlistings.js",northendTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/northend/threebedlistings.js",northendThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/northend/fourplusbedlistings.js",northendFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/somerville/studiolistings.js",somervilleStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/somerville/onebedlistings.js",somervilleOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/somerville/twobedlistings.js",somervilleTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/somerville/threebedlistings.js",somervilleThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/somerville/fourplusbedlistings.js",somervilleFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/southend/studiolistings.js",southendStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/southend/onebedlistings.js",southendOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southend/twobedlistings.js",southendTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southend/threebedlistings.js",southendThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/southend/fourplusbedlistings.js",southendFourPlusBedroomListingsJSON);
      
      saveToStorage("/real-estate-data/rentals/westend/studiolistings.js",westendStudioListingsJSON);
      saveToStorage("/real-estate-data/rentals/westend/onebedlistings.js",westendOneBedroomListingsJSON);
      saveToStorage("/real-estate-data/retnals/westend/twobedlistings.js",westendTwoBedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/westend/threebedlistings.js",westendThreebedroomListingsJSON);
      saveToStorage("/real-estate-data/rentals/westend/fourplusbedlistings.js",westendFourPlusBedroomListingsJSON);
			
			// Todo on promise.all, make saveToStorage a promise
    	cb(null, { "status": "success" });
    } catch(e) {
    }
  }).catch(function(){
      
  })
}

function saveToStorage(url, data) {
  request(aws4.sign({
  'uri': 'https://juan.nyc3.digitaloceanspaces.com' + url,
  'method': 'PUT',
  'path': url,
  'headers': {
	"Cache-Control":"no-cache",
	"Content-Type":"application/json",
	"accept":"*/*",
	"x-amz-acl": "public-read",
	"host":"juan.nyc3.digitaloceanspaces.com",
	"accept-encoding":"gzip, deflate",
	"content-length":  Buffer.byteLength(data)
  },
  body: data
  },{accessKeyId: 'IMHLDGESXWS2OCCWT27H', secretAccessKey: 'eM6wxMNb6WeILvX88sjfNVrvbb0/UQ7TIAdIdg/UYks'}),function(err,res){
	if(res.statusCode === 403) {
	    console.log(res);
	    process.exit(1);
	}
	if(err) {
		console.log(err);
	}
})
}
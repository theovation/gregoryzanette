import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as Request from 'request';
import * as aws4 from 'aws4';

declare var $ : any;

@Injectable()
export class ListingsService {
  private url:string;
  constructor(private http: Http) { }

  getSingleListing(listingID : any) {
    var self = this;
    return new Promise(function(resolve){
     $.ajax({
        url: 'https://wt-9a06f86b30413aa2d4c274a7b017231e-0.run.webtask.io/getSingleMLSListing' + "?mlsid=" + listingID,
        type: 'GET',
        success: function (data) {
          resolve(data);
          // resolve(JSON.parse(data).listings);
        },
        error: function(xhr,status,error){ },
        crossDomain: true,
     });
    });
  }

  getListings(neighborhood : string, roomCount : number, listingType) {
  	var self = this;
  	var fileName = "";

  	console.log(roomCount);

  	if(roomCount == 0) {
  		fileName = "studiolistings.json";
  	}
  	if(roomCount == 1) {
  		fileName = "onebedlistings.json";
  	}
  	if(roomCount == 2) {
  		fileName = "twobedlistings.json";
  	}
  	if(roomCount == 3) {
  		fileName = "threebedlistings.json";
  	}
  	if(roomCount == 4) {
  		fileName = "fourplusbedlistings.json";
  	}

  	if(roomCount == 5) {
  		fileName = "all.json";
  	}

    if(listingType === "lease") {
      var url = "https://s3.amazonaws.com/bostonrentals/real-estate-data/rentals/" + neighborhood + "/" + fileName;
    } else if (listingType === "commercial") {
      var url = "https://s3.amazonaws.com/bostonrentals/real-estate-data/commercial/" + neighborhood + "/" + fileName;
    } else if(listingType === 'singlefamily') {
      var url = "https://s3.amazonaws.com/bostonrentals/real-estate-data/singlefamily/" + neighborhood + "/" + fileName;
    } else if(listingType === 'forsale') {
      var url = "https://s3.amazonaws.com/bostonrentals/real-estate-data/condos/" + neighborhood + "/" + fileName;
    } else if(listingType === 'multifamily') {
      var url = "https://s3.amazonaws.com/bostonrentals/real-estate-data/multifamily/" + neighborhood + "/" + fileName;
    }


	return new Promise(function(resolve){
		$.ajax({
		    url: url,
		    type: 'GET',
		    success: function (data) {
		    	resolve(JSON.parse(data).listings);
		    },
        error: function(xhr,status,error){

        },
        crossDomain: true,
		});
	})
  }
}

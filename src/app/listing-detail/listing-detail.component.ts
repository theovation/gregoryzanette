import { Component, OnInit, Input } from '@angular/core';
import { ListingsService } from '../listingServices/listings.service';
import { Listing } from '../data/listing';
import {ActivatedRoute} from '@angular/router';
import { EventEmitter } from '@angular/core';

declare var $ : any;
declare var firebase : any;
declare var secondary : any;

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})

export class ListingDetailComponent implements OnInit {
  listing : Listing;

 public open(event, listingID, numOfImages) {
/*
      var baseUrlEnd = "&o=&n=";
      var imageUrls = [];
      var newImageUrl;
      var baseUrl;
      for(var k = 0; k < numOfImages - 1; k++) {
      baseUrl = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls=" + listingID;
      baseUrlEnd = "&o=&n=" + k;
          newImageUrl = baseUrl + baseUrlEnd;
          console.log(newImageUrl)
          imageUrls.push({
            "src": newImageUrl
          });
      }

    $(".gallery." + listingID).lightGallery({
      dynamic: true,
        dynamicEl: imageUrls
    })
*/
  }

  constructor(private service: ListingsService, private route : ActivatedRoute) {
    var self = this;
  }

  id : number;

  ngOnInit() {
  var self = this;

  function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

    this.route.params.subscribe(params => {
      self.id = params['mlsid']
      var id = params['mlsid']

      if (params['mlsid']) {
      	console.log(params['mlsid'])
setTimeout(function(){

    self.service.getSingleListing(id).then(function(status : any){  
    var listing = status.status;
    firebase.database().ref().orderByChild('id').equalTo(listing["LIST_AGENT"]/*use id variable when live, CN219484 while testing*/).once('value',function(snapshot){
      var val = snapshot.val();
      console.log(snapshot.val().fullName);
      snapshot.forEach(function(data){
        $("#" + id + " " + ".agentName").html(data.val().fullName);
        // $("#" + id + " " + ".agentId").html(data.val().id);
      console.log(data.val().fullName);
      });
    });

    secondary.database().ref().orderByChild('id').equalTo(listing["LIST_OFFICE"]/*use id variable when live, CN219484 while testing*/).once('value',function(snapshot){
      var val = snapshot.val();
      console.log(snapshot.val().fullName);
      snapshot.forEach(function(data){
        $("#" + id + " " + ".broker").html(data.val().broker);
        // $("#" + id + " " + ".agentId").html(data.val().id);
      console.log(data.val().broker);
      });
    });






    var baseUrlStart = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls="
    var baseUrlEnd = "&o=&n="

    debugger; 

        listing.REMARKS = listing.REMARKS.replace(/\uFFFD/g, '')
        listing.address = listing.STREET_NO + "+" + listing.STREET_NAME + "," + "Boston+MA+" + listing.ZIP_CODE;
        listing.map = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAkFSdihTSvsCcMzzmBDw_vYlOaoYZ02G8&q=" + listing.address;
        listing.LIST_PRICE = addCommas(listing.LIST_PRICE);
        listing.imageSourceOne = baseUrlStart + listing.LIST_NO + baseUrlEnd + 0;
        listing.imageSourceTwo = baseUrlStart + listing.LIST_NO + baseUrlEnd + 1;
        listing.imageSourceThree = baseUrlStart + listing.LIST_NO + baseUrlEnd + 2;
        listing.imageSourceFour = baseUrlStart + listing.LIST_NO + baseUrlEnd + 3;


      self.listing = listing;


    })






}, 500);
      }
    });
  }

}

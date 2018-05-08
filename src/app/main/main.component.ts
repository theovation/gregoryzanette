import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listingServices/listings.service';


declare var $ : any;
declare var window : any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  studioCount : number = 0;
  oneBedroomCount : number = 0;
  twoBedroomCount : number = 0;
  threeBedroomCount : number = 0;
  fourPlusBedroomCount : number = 0;

  constructor(private service: ListingsService) {
	var self = this;

	/*
	self.service.getBackBayListings().then(function(listings : any){	  	
		for(var i = 0; i < listings.length; i++) {
			var bedRooms = listings[i].NO_BEDROOMS;
			if(bedRooms == "0") {
	  			self.studioCount++;	
			} else if (bedRooms == "1") {
  				self.oneBedroomCount++;
			} else if (bedRooms == "2") {
  				self.twoBedroomCount++;
			} else if (bedRooms == "3") {
  				self.threeBedroomCount++;
			} else {
  				self.fourPlusBedroomCount++;
			}
		}
	});
	*/
  }

  ngOnInit() {
	$("#header-text").text(window.neighborhoodText + " ");
  }
}

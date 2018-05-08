import { Component, OnInit, Input } from '@angular/core';
import { ListingsService } from '../listingServices/listings.service';
import {ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';

declare let $ : any;
declare let window : any;
declare let iframely : any;
declare let knuthShuffle : any;
declare let setTimeout : any;
declare let isGreg : any;
declare let _ : any;
declare let simpleQueryString : any;

@Component({
  selector: 'app-listings-by-room',
  templateUrl: './listings-by-room.component.html',
  styleUrls: ['./listings-by-room.component.css']
})
export class ListingsByRoomComponent implements OnInit {
  @Input()
  allListings : any;
  listings: any;
  listing: any;
  rooms: string;
  baseUrlStart: string;
  baseUrlEnd: string;

  addCommas(nStr) {
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

  loadGallery(a, b){
  	$('.gallery.' + a).on('click', function() {
  	    $(this).lightGallery({
  	        dynamic: true,
  	        dynamicEl: b
  	    })
  	});
  }

  applyFiltering(minimum : any, maximum : any) {
    var self = this;

    if(maximum === 'none') {
      self.listings = self.allListings;
      $('#sort').trigger('change');
    } else {
      maximum = parseInt(maximum);

      var listings = self.allListings;
      var filteredListings = [];
      
      for (var i = 0; i < listings.length; i++) {
        if((parseInt(listings[i].LIST_PRICE.replace(/,\s?/g, "")) > maximum)) {
          continue
        } else {
          filteredListings.push(listings[i]);
        }
      }

      self.listings = filteredListings;
    }
  }

  afterViewInit() {
    var self = this;
    
    $('#err').hide();

    this.setupNeighborhoodsAndListingType();


        var listingType = $('#listingtype').val();

        if(listingType === 'commercial' || listingType === 'singlefamily' || listingType === 'multifamily' || window.neighorhoodCode == 'weston') {
          setTimeout(function(){
            $('.unitNum').hide();
            // $('.roomCount').hide();
          }, 500);
        }



    // TODO add error checking & else

    $('#rooms').change(function() {
      var numOfRooms = $(this).val();

      if(numOfRooms === 'none') {
        self.listings = self.allListings;
      }

      if(numOfRooms === '0') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS == '0';
        });
      } else if (numOfRooms === '1') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS == '1';
        });
      } else if (numOfRooms === '2') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '2';
        });
      } else if(numOfRooms === '3') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '3';
        });
      } else if (numOfRooms === '4') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '4';
        });
      }
      
      // $('#maximum').trigger('change');
      var maximum = $('#maximum').val();

      if(maximum === 'none') {
        return;
      } else {
          maximum = parseInt(maximum);
  
          var listings = self.listings;
          var filteredListings = [];
          
          for (var i = 0; i < listings.length; i++) {
            if((parseInt(listings[i].LIST_PRICE.replace(/,\s?/g, "")) > maximum)) {
              continue
            } else {
              filteredListings.push(listings[i]);
            }
          }
  
        self.listings = filteredListings;
      }
      
      $('#sort').trigger('change');
    });

    $('#sort').change(function(){
      var sortType = $(this).val();

      if (sortType === 'highToLow') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return b - a;
        });
        console.log(self.listings);
      } else if (sortType === 'lowToHigh') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return a - b;
        });
      }
    });

    $('#minimum').change(function() {
      var minimum = $(this).val();
      var maximum = $('#maximum').val();
      self.applyFiltering(minimum, maximum);
      $('#sort').trigger('change');
    });

    $('#maximum').change(function() {
      var maximum = $(this).val();
      var minimum = $('#minimum').val();
      self.applyFiltering(minimum, maximum);
      $('#sort').trigger('change');
    });
  }

  ngAfterViewInit() {
    var self = this;
    
    $('#err').hide();

    this.setupNeighborhoodsAndListingType();

    // TODO add error checking & else

    $('#rooms').change(function() {
      var numOfRooms = $(this).val();

      if(numOfRooms === 'none') {
        self.listings = self.allListings;
      }

      if(numOfRooms === '0') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS == '0';
        });
      } else if (numOfRooms === '1') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS == '1';
        });
      } else if (numOfRooms === '2') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '2';
        });
      } else if(numOfRooms === '3') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '3';
        });
      } else if (numOfRooms === '4') {
        self.listings = self.allListings.filter(function(listing){
          return listing.NO_BEDROOMS === '4';
        });
      }
      
      // $('#maximum').trigger('change');
      var maximum = $('#maximum').val();

      if(maximum === 'none') {
        return;
      } else {
          maximum = parseInt(maximum);
  
          var listings = self.listings;
          var filteredListings = [];
          
          for (var i = 0; i < listings.length; i++) {
            if((parseInt(listings[i].LIST_PRICE.replace(/,\s?/g, "")) > maximum)) {
              continue
            } else {
              filteredListings.push(listings[i]);
            }
          }
  
        self.listings = filteredListings;
      }
      
      $('#sort').trigger('change');
    });

    $('#sort').change(function(){
      var sortType = $(this).val();

      if (sortType === 'highToLow') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return b - a;
        });
        console.log(self.listings);
      } else if (sortType === 'lowToHigh') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return a - b;
        });
      }
    });

    $('#minimum').change(function() {
      var minimum = $(this).val();
      var maximum = $('#maximum').val();
      self.applyFiltering(minimum, maximum);
      $('#sort').trigger('change');
    });

    $('#maximum').change(function() {
      var maximum = $(this).val();
      var minimum = $('#minimum').val();
      self.applyFiltering(minimum, maximum);
      $('#sort').trigger('change');
    });
  }

  postProcessListings(listings) : any {
 		for(var i = 0; i < listings.length; i++) {
			if(isNaN(listings[i].PHOTO_COUNT)) {
				listings[i].REMARKS = listings[i].REMARKS + listings[i].PHOTO_COUNT;
				listings[i].PHOTO_COUNT = listings[i].PHOTO_DATE
				listings[i].NO_ROOMS = listings[i].NO_BEDROOMS;
				listings[i].NO_BEDROOMS = listings[i].NO_FULL_BATHS;
				listings[i].NO_FULL_BATHS = listings[i].NO_HALF_BATHS;
				listings[i].NO_HALF_BATHS = listings[i].MASTER_BATH;
				listings[i].MASTER_BATH = listings[i].PARKING_SPACES;
				listings[i].PARKING_SPACES = listings[i].LOT_SIZE;
				listings[i].LOT_SIZE = listings[i].SQUARE_FEET;
				listings[i].SQUARE_FEET = listings[i].NO_BATHS;
			}
		}
    return listings;
	}

  // @Output() listingTypeSelector : EventEmitter<any> = new EventEmitter();
  
  setupNeighborhoodsAndListingType() {
    var self = this;

    $('#listingtype').change(function() {        
        var listingType = $('#listingtype').val();
        self.init(listingType);
        
        // $('.roomCount').show();

        var listingType = $('#listingtype').val();

        if(listingType === 'commercial' || listingType === 'singlefamily' || listingType === 'multifamily' || window.neighborhoodCode  === 'weston') {
          setTimeout(function(){
            $('.unitNum').hide();
            // $('.roomCount').hide();
          }, 500);
        }

        if(listingType === 'commercial') {
          setTimeout(function(){
            $('.roomCount').hide();
          }, 500);
        }

        if(listingType === 'multifamily') {
          setTimeout(function(){
            $('.bedroomCount').hide();
          }, 500);
        }

        if(listingType === 'singlefamily') {
          setTimeout(function(){
           $('.parkingSpace').hide();
          }, 500);
        }

    });


    $('#neighborhoods').change(function(){
        window.neighborhoodCode = $(this).val();

        window.queryKeys.neighborhood = window.neighborhoodCode;
        
        // $("#header-text").text($(this).val());        
        var listingType = $('#listingtype').val();
        self.init(listingType);
    });
  }

  init(listingtype) {
    let self = this;

    if(window.neighborhoodCode === undefined) {
      window.neighborhoodCode = $("#neighborhoods").val();
    }

    // var splitPath = window.location.pathname.split("/");
    // var splitPathLength = splitPath.length - 1;
    // var listingCount = splitPath[splitPathLength];

    // TODO
    var allListings = 5;
    this.service.getListings(window.neighborhoodCode, allListings, listingtype).then(function(listings : any){ 
      _.remove(listings, function(listing) {
        return listing.PHOTO_COUNT == 1;
      });

    var baseUrlStart = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls="
    var baseUrlEnd = "&o=&n="
      for (var i = 0; i < listings.length; ++i) {
        listings[i].STREET_NAME = _.upperFirst(listings[i].STREET_NAME)
        listings[i].REMARKS = listings[i].REMARKS.replace(/\uFFFD/g, '')
        listings[i].address = listings[i].STREET_NO + "+" + _.upperFirst(listings[i].STREET_NAME) + "," + "Boston+MA+" + listings[i].ZIP_CODE;
        listings[i].map = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAkFSdihTSvsCcMzzmBDw_vYlOaoYZ02G8&q=" + listings[i].address;
        listings[i].LIST_PRICE = self.addCommas(listings[i].LIST_PRICE);
        listings[i].imageSourceOne = baseUrlStart + listings[i].LIST_NO + baseUrlEnd + 0;
      }

      $("#show").hide();
      
      self.listings = self.postProcessListings(listings).slice();

      var sortType = $('#sort').val()

      if (sortType === 'highToLow') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return b - a;
        });
        console.log(self.listings);
      } else if (sortType === 'lowToHigh') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return a - b;
        });
      }

      self.allListings = self.listings.slice();
      
      if(self.listings.length === 0) {
        if(!($('#nolistingstext').length > 0)) {
          $('.nolistingsbreak').after("<h4 id='nolistingstext'>There are currently no listings in this neighborhood that fit your search criteria</h4>");
        }
      } else {
        $('#nolistingstext').remove();
      }


      self.afterViewInit();
      setTimeout(function(){
        var listingType = $('#listingtype').val();

        if(listingType === 'commercial' || listingType === 'singlefamily' || window.neighborhoodCode === 'weston' ) {
          setTimeout(function(){
            $('.unitNum').hide();
            // $('.roomCount').hide();
          }, 500);

          var listingType = $('#listingtype').val();
  
          if(listingType === 'commercial') {
            setTimeout(function(){
              $('.roomCount').hide();
            }, 500);
          }

          if(listingType === 'multifamily') {
              setTimeout(function(){
              $('.bedroomCount').hide();
            }, 500);
          }

          if(listingType === 'singlefamily' || listingType === 'multifamily') {
            setTimeout(function(){
             $('.parkingSpace').hide();
            }, 500);
          }
        }

        window.reloadHeaderText(window.neighborhoodCode);      
      },200)

/*
      setInterval(function(){
        if($('.map').length) {
          for(var j = 0; j < $(".map").length; j++) {
           var mapUrl = self.listings[j].address.replace(" ", "+")
           $($(".map")[j]).html("<img href='https://www.google.ca/maps/place/" + mapUrl + "' " + "data-iframely-url>");
          }
         $(function() {
           iframely.load();
         });
        }
      }, 1000)
*/
  });
  }

  IsGreg : number = window.isGreg

  constructor(private service: ListingsService, private route:ActivatedRoute) {
    let self = this;

    debugger;

    window.queryKeys = {};

    if(window.queryParameters) {
      window.queryKeys = simpleQueryString.parse(window.queryParameters);
    } else {
      window.queryKeys = simpleQueryString.parse(window.location.search);
    }

    var listingCount = 1;
    var neighborhood = 'backbay';
    var listingtype = 'forsale';


    if($("#neighborhoods").val() !== "backbay") {
      window.neighborhoodCode = $("#neighborhoods").val();
    }

    console.log(window.queryKeys.neighborhood);
    console.log(window.queryKeys.listingtype);


      
    if(window.queryKeys.neighborhoods) {
      window.queryKeys.neighborhood = window.queryKeys.neighborhoods;
    }

    if(window.queryKeys.neighborhood) {
      neighborhood = window.queryKeys.neighborhood;
    } else {
      neighborhood = 'backbay'
      window.queryKeys.neighborhood = neighborhood;
      $("#neighborhoods").val('Back Bay');
    } 

    if(window.queryKeys.listingtype) {
      listingtype = window.queryKeys.listingtype;
    }

    if(localStorage.getItem('neighborhood') && localStorage.getItem('proptype')) {
      window.hood = localStorage.getItem('neighborhood').replace(/\s+/, "").toLowerCase()
      window.proptype = localStorage.getItem('proptype');

      if(window.proptype === "RN") {
        listingtype = "lease";      
      } else if(window.proptype === "CI") {
        listingtype = "commercial";      
      } else if(window.proptype === "CC") {
        listingtype = "forsale"
      } else if(window.proptype === "SF") {
        listingtype = "singlefamily";      
      } else if(window.proptype === "MF") {
        listingtype = "multifamily";      
      }

      setTimeout(function(){
        $("#neighborhoods").val(window.hood);
        
        if(window.proptype === "RN") {
          $("#listingtype").val("lease")        
        } else if(window.proptype === "CI") {
          $("#listingtype").val("commercial")
        } else if(window.proptype === "CC") {
          $("#listingtype").val("forsale")
        } else if(window.proptype === "SF") {
          $("#listingtype").val("singlefamily")
        } else if(window.proptype === "MF") {
          $("#listingtype").val("multifamily")
        }

      },500);

      setTimeout(function(){
        $("#neighborhoods").val(window.hood);
        
        if(window.proptype === "RN") {
          $("#listingtype").val("lease")        
        } else if(window.proptype === "CI") {
          $("#listingtype").val("commercial")
        } else if(window.proptype === "CC") {
          $("#listingtype").val("forsale")
        } else if(window.proptype === "SF") {
          $("#listingtype").val("singlefamily")
        } else if(window.proptype === "MF") {
          $("#listingtype").val("multifamily")
        }

      },1000);

      neighborhood = localStorage.getItem('neighborhood').replace(/\s+/, "").toLowerCase(); 
      localStorage.removeItem('neighborhood');
      localStorage.removeItem('proptype');

    } else if(localStorage.getItem('neighborhood')) {
      window.hood = localStorage.getItem('neighborhood').replace(/\s+/, "").toLowerCase()

      setTimeout(function(){
        $("#neighborhoods").val(window.hood);        
      },500);
      neighborhood = localStorage.getItem('neighborhood').replace(/\s+/, "").toLowerCase(); 
      localStorage.removeItem('neighborhood')
    }
    this.service.getListings(neighborhood, 5, listingtype).then(function(listings : any){ 

setTimeout(function(){

    // if(window.queryKeys.neighborhood) {
    //   $("#neighborhoods").val(window.queryKeys.neighborhood);
    // } else {
    //   $("#neighborhoods").val('Back Bay');
    // }   

},500)		

    _.remove(listings, function(listing) {
      return listing.PHOTO_COUNT == 1;
    });

    var baseUrlStart = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls="
		var baseUrlEnd = "&o=&n="
    	for (var i = 0; i < listings.length; ++i) {
        listings[i].PHOTO_COUNT = parseInt(listings[i].PHOTO_COUNT)
        listings[i].STREET_NAME = _.upperFirst(listings[i].STREET_NAME)
        listings[i].REMARKS = listings[i].REMARKS.replace(/\uFFFD/g, '')
    		listings[i].address = listings[i].STREET_NO + "+" + _.upperFirst(listings[i].STREET_NAME) + "," + "Boston+MA+" + listings[i].ZIP_CODE;
    		listings[i].map = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAkFSdihTSvsCcMzzmBDw_vYlOaoYZ02G8&q=" + listings[i].address;
    		listings[i].LIST_PRICE = self.addCommas(listings[i].LIST_PRICE);
    		listings[i].imageSourceOne = baseUrlStart + listings[i].LIST_NO + baseUrlEnd + 0;
    	}

    	$("#show").hide();
    	
      self.listings = self.postProcessListings(listings).slice();

      var sortType = $('#sort').val()

      if (sortType === 'highToLow') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return b - a;
        });
        console.log(self.listings);
      } else if (sortType === 'lowToHigh') {
        self.listings = self.listings.sort(function(a, b){ 
          a = parseInt(a.LIST_PRICE.replace(/,/g, ''), 10);
          b = parseInt(b.LIST_PRICE.replace(/,/g, ''), 10)
          return a - b;
        });
      }

      self.allListings = self.listings.slice();
    	
      if(self.listings.length === 0) {
        if(!($('#nolistingstext').length > 0)) {
          $('.nolistingsbreak').after("<h4 id='nolistingstext'>There are currently no listings in this neighborhood that fit your search criteria</h4>");
        }
      } else {
        $('#nolistingstext').remove();
      }


/*
    	setInterval(function(){
    		if($('.map').length) {
          for(var j = 0; j < $(".map").length; j++) {
    			 var mapUrl = self.listings[j].address.replace(" ", "+")
    			 $($(".map")[j]).html("<img href='https://www.google.ca/maps/place/" + mapUrl + "' " + "data-iframely-url>");
    		  }
  			 $(function() {
  			   iframely.load();f
  			 });
        }
    	}, 1000)
*/
	});
  };

  ngOnInit() { 
    // var val = 3;
    // $('#maximum option').append("<option value='" + val + "'>No Limit</option>");

    $("#header-text").text(window.neighborhoodText);

  	if(this.route.snapshot.params['rooms'] == "0") {
  		this.rooms = "studio";
  	} else if(this.route.snapshot.params['rooms'] == "4") {
  		this.rooms = "4+";
  	} else {
		this.rooms = this.route.snapshot.params['rooms'];  		
  	}
  };
}

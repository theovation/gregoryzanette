import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Listing } from '../data/listing';

declare let $ : any;
declare let emailjs : any;
declare let generateGallery : any;
declare let showContactModal : any;
declare let showMapModal : any;
declare let window : any;
declare let firebase : any;
declare let secondary : any;
declare let isGreg;
declare let Clipboard : any;
declare let fetch : any;

@Component({
  selector: 'app-rental-card',
  templateUrl: './rental-card.component.html',
  styleUrls: ['./rental-card.component.css']
})
export class RentalCardComponent implements OnInit, Listing {
  LIST_PRICE = "";
  PROP_TYPE= "";
  LIST_NO= "";
  LIST_AGENT= "";
  LIST_OFFICE= "";
  STATUS= "";
  STREET_NO= "";
  STREET_NAME= "";
  UNIT_NO= "";
  TOWN_NUM= "";
  AREA= "";
  ZIP_CODE= "";
  address= "";
  LENDER_OWNED= "";
  REMARKS= "";
  PHOTO_COUNT= "";
  PHOTO_DATE= "";
  PHOTO_MASK= "";
  MF_TYPE= "";
  NO_UNITS= "";
  NO_FLOORS= "";
  TOTAL_RMS= "";
  GARAGE_SPACES= "";
  PARKING_SPACES= "";
  LOT_SIZE= "";
  ACRE= "";
  SQUARE_FEET= "";
  COUNTY= "";
  STATE= "";
  YEAR_BUILT= "";
  ASSESSMENTS= "";
  TAXES= "";
  TAX_YEAR= "";
  TOTAL_BRS= "";
  TOTAL_FULL_BATHS= "";
  TOTAL_HALF_BATHS= "";
  BASEMENT_FEATURE= "";

  RSU_UNITS = "";
  RSF_BLDG_SF = "";
  OFU_UNITS = "";
  OFF_BLDG_SF = "";
  REU_UNITS = "";
  REF_BLDG_SF = "";
  WAU_UNITS = "";
  WAF_BLDG_SF = "";
  MAU_UNITS = "";
  MAF_BLDG_SF = "";
  NO_STORIES = "";
  TOTAL_UNITS = "";
  TOTAL_BLDG_SF = "";

  @Input()
  listing = Listing;

  @Input()
  set ready(isReady : boolean) {
    if(isReady) {
      console.log(this.listing["LIST_NO"]);
      // $("#" + this.listing["LIST_NO"])
    }
  }

  IsGreg : number = window.isGreg

  comm : boolean = false;

  showUnitNo : boolean = false;

  gallery : any = [];

  constructor(public sanitizer: DomSanitizer) {
  }

  prev(id) {
    if(this.currIndex === 0) {
      this.currIndex = this.listing["PHOTO_COUNT"]
    }

    this.currIndex = this.currIndex - 1;
    this.showingIndex = this.currIndex + 1;

//    this.updateUIIndex(id, this.showingIndex)
    this.updateGallery(this.currIndex, id);
  }

  currIndex : number = 0;

  showingIndex : number = 1;

  next(id) {
    this.currIndex = this.currIndex + 1;
    this.showingIndex = this.currIndex + 1;

    // this.updateUIIndex(id, this.showingIndex)
    this.updateGallery(this.currIndex, id);
  }

  updateGallery(i, id) {
    var newString = this.generateImageStringUrl(i, id);
    var domString = "<div class='fade'><div style='z-index: 100;' class='text'><span style='z-index: 1000;' class='count 0'>" + this.showingIndex + "</span> / " + this.listing["PHOTO_COUNT"] + "</div><img style='width: 100%;' src='" + newString + "'/></div>";

    domString = domString + 
      "<a class='prev' onclick='prev(" + id + ", " + (i - 1) + "," + this.listing["PHOTO_COUNT"] + ")''>&#10094;</a>" +
      "<a class='next' onclick='next(" + id + ", " + (i + 1) + "," + this.listing["PHOTO_COUNT"] + ")''>&#10095;</a>";


    $("#" + this.listing["LIST_NO"] + " .slideshow-container").html(domString);

    return;


    // $("#" + id + " .fade").not('.mySlides').addClass("mySlides")
    

    // element that does not have mySlides, add it
    // find new index and remove mySlides from that one
    /*
    $("#" + id + " .fade").each(function(index, element){
      if(index === i) {
        $("#" + id + " ." + i).parent().parent().removeClass("mySlides")
        // console.log($("#" + id + " .fade")[this.currIndex])
        // $($("#" + id + " .fade")[this.currIndex]).parent().parent().parent().removeClass("mySlides")
      }
    });
    */
  }

  updateUIIndex(id, index) {
    $("#" + id + " .count").text(index)
  }

  getCurrentIndex(id) {
    return this.currIndex
  }

/*****************************************************/
  
  currentGalleryDOMString : string = "";

  imageArr : any = [];

  baseUrl : string;

  baseUrlEnd : string;

  visitListingPage(id) {
    console.log(id)
    window.location.href="/detail.html?id=" + id + '#';
  }

  generateImageStringUrl(index, id) {
    var baseUrl = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls=" + id;
    var baseUrlEnd = "&o=&n=" + index;
    var newImageUrl = baseUrl + baseUrlEnd;
    return newImageUrl;
  }

  ngAfterViewInit() {
    var isGreg = window.location.hostname.indexOf("ovation");

	  if(isGreg !== -1) {
	  	$(".buyersAgent").each(function(){
	  		$(this).html("Gregory Zanette")
	  	});
	  } else {
	  	$(".buyersAgent").each(function(){
	  		$(this).html("Juan Antelo")
	  	});
	  }

    var domString = "<div class='fade'><div class='text'><span class='count 0'>1</span> / " + this.listing["PHOTO_COUNT"] + "</div><img style='width: 100%;' src=" + this.listing["imageSourceOne"] + "/></div>";

    this.currentGalleryDOMString = domString;

    var imageArr = [];
    var baseUrl;
    var baseUrlEnd;
    var newImageUrl;
/*
    for(var i = 1; i < this.listing["PHOTO_COUNT"] - 1; i++) {
       baseUrl = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls=" + this.listing["LIST_NO"];
       baseUrlEnd = "&o=&n=" + i;
       newImageUrl = baseUrl + baseUrlEnd;
       console.log(newImageUrl)
       imageArr.push({
         "src": newImageUrl
       });

       domString = domString.concat("<div class='fade mySlides'><div class='text'><span class='" + i + " count'>" + i + "</span> / " + this.listing["PHOTO_COUNT"] + "</div><img style='width: 100%;' src=" + newImageUrl + "/></div>");
    }
*/

    $("#" + this.listing["LIST_NO"] + " .slideshow-container").append(domString);
  }

  copyLink(listingID) {
    //$("#copyMe").copyText(); // Copy text to clipboard
  }

  public cleanURL(url) : any {
 	return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public openMapModal(listing) {
	var address = listing.STREET_NO + "+" + listing.STREET_NAME + "+" + "Boston+MA";
    showMapModal(address.replace(" ","+"));
  }

  public openContactForm() {
    showContactModal();
  }

  public open(event, listingID, numOfImages) {
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
  }

  ngOnInit() {
    if(this.listing["UNIT_NO"] == this.listing["STREET_NO"]) {
      this.showUnitNo = false;
    } else {
      this.showUnitNo = true;
    }

    var imgCount = this.listing["PHOTO_COUNT"];
    var baseUrl = "https://h3n.mlspin.com/photo/photo.aspx?nopadding=1&h=768&w=1024&mls=" + this.listing["LIST_NO"];
    var newImageUrl;
    var baseUrlEnd;

    for(var i = 0; i < this.listing["PHOTO_COUNT"] - 1; i++) {
         baseUrlEnd = "&o=&n=" + i;
         newImageUrl = baseUrl + baseUrlEnd;
         this.gallery.push({
           "src": newImageUrl
         });
    }
  }

  showSlides(n, id) {
    var i;
    var slideIndex = 1;
    var slides = $(".mySlides");

    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    
    $("#" + id + ".mySlides").each(function(){
      $(this).css({
        'display':'none'
      })
    });

    // slides[slideIndex-1].style.display = "block";
  }

  send(id) {
  	var email = $("#" + id + " .i-email").val();
  	var name =   $("#" + id + " .i-name").val();
  	var number = $("#" + id + " .i-number").val();

  	this.modal();

  	emailjs.send("default_service","new_lead",{
  		ID: id,
  		name: name,
  		number: number,
  		email: email
  	});

  	emailjs.send("default_service","rental_form",{
  		to_email: email,
  		neighborhood: window.neighborhoodText
  	});
  }

  modal() {
	  var modal = document.getElementById('myModal');
	  var span : any = document.getElementsByClassName("close")[0];
	  modal.style.display = "block";
	  span.onclick = function() { modal.style.display = "none"; }
	  window.onclick = function(event) {
	      if (event.target == modal) {
	          modal.style.display = "none";
	      }
	  }
  }

  toggleState() {
  	console.log("toggleState");
  }

  expand(id) {
     window.lock = true;
  	 console.log(id);
  	 $("#" + id + " " + ".contracted").hide();
     fetch("https://wt-9a06f86b30413aa2d4c274a7b017231e-0.run.webtask.io/rentals-attempt?listagent=" + this.listing["LIST_AGENT"] + "&listoffice=" + this.listing["LIST_OFFICE"])
     .then(function(response) {
       return response.json();
     })
     .then(function(myJson) {
         console.log(myJson);
         console.log(myJson.status.name);
         console.log(myJson.status.office);
         $("#" + id + " " + ".broker").html(myJson.status.office);
         $("#" + id + " " + ".agentName").html(myJson.status.name);
     });

        var listingType = $('#listingtype').val();

        if(listingType === 'commercial') {
          setTimeout(function(){
            $('.roomCount').hide();
          }, 500);
        }

  	$("#" + id + " " + ".expanded" ).slideDown("slow");

    window.id = id;
    window.lock = false;

  }

  contract(id) {
  	console.log(id);
  	$("#" + id + " " + ".expanded" ).slideUp("slow",function(){
  		$("#" + id + " " + ".contracted").show();  		
  	});
  }
}

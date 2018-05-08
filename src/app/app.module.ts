import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app/app.component';

import { BackButtonComponent } from './buttonComponents/back-button/back-button.component';
import { RentalCardComponent } from './rental-card/rental-card.component';

import { ListingsService } from './listingServices/listings.service';
import { ListingsByRoomComponent } from './listings-by-room/listings-by-room.component';
import { enableProdMode } from '@angular/core';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';

enableProdMode();

declare var window : any;

debugger;
window.queryParameters = window.location.search;

const appRoutes: Routes = [
  {
    path: 'listings',
    component: ListingsByRoomComponent
  },
  {
  	path: 'listings/:mlsid',
  	component: ListingDetailComponent
  },
  { 
    path: 'listing.html',
    redirectTo: 'listings',
    pathMatch: 'full'
  },
  { 
    path: '',
    component: ListingsByRoomComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RentalCardComponent,
    BackButtonComponent,
    ListingsByRoomComponent,
    ListingDetailComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: false }
    )
  ],
  providers: [
    ListingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

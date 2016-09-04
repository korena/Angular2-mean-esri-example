import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './map.component';
import { SearchComponent } from './search.component';
import { DonorFormComponent } from './create-donor.component';


import webMercatorUtils = require ('esri/geometry/webMercatorUtils');

@Component({
    selector: 'my-app',
    templateUrl : '../views/app.view.html'
})
export class AppComponent {

  // references to child components
  @ViewChild(MapComponent) mapComponent:MapComponent;
  @ViewChild(SearchComponent) searchComponent:SearchComponent;
  @ViewChild(DonorFormComponent)donorFormComponent:DonorFormComponent;

  title = 'Bloodshare Map';

  showMessage:boolean = true;
  showLink:boolean = false;
  link:string = '#';
  messages:string = "You're looking at a map that displays information about registered blood donors,"
                +"if you'd like to register, click on the icon showing your location, and provide the requested"
                +" information.";

  // map config
  itemId = '53cf3182f9b24e178f16d708e4c6dc2c';
  public mapOptions = {
    zoom: 5, // random, will change at map service layer
    infoWindow: undefined, // set at the map service layer
    spatialReference: undefined // set at the map service layer
  };

  public locationOptions = {
    enableHighAccuracy: true,
    timeout: 300000,
    maximumAge: 300000, // 5 minutes cache, get new if older
  };


  // search config
  public searchOptions = {
    enableButtonMode: true, //this enables the search widget to display as a single button
    enableLabel: false,
    enableInfoWindow: true,
    showInfoWindowOnSelect: false,
  };

  // once the map loads
  onMapLoad(response) {
    const map = response.map;
    // bind the search dijit to the map
    this.searchComponent.setMap(map);
    // center map to user's location 
    this.mapComponent.setUserLocation();
  }

  // once the location is clicked
  onLocationClicked(event:any){
    // fill the form with longitude and latitude, then activate it ...
    // console.log('mapPoint(x,y)',event.mapPoint.x,event.mapPoint.y);
    var normalizedVal = webMercatorUtils.xyToLngLat(event.mapPoint.x, event.mapPoint.y);
    // console.log('normalizedGeometryPoint(x,y)',normalizedVal);
    this.donorFormComponent.activated = true;
    this.showMessage = false;
    this.showLink = false;
    this.link = "#";
    this.donorFormComponent.fillInit(normalizedVal[0],normalizedVal[1]);
  }


  onFormSubmit(model:any){
    this.donorFormComponent.activated = false;
    this.showMessage = true;
    if(model){
      // call map.component to create feature remotely
      this.mapComponent.createDonor(model);
    }else{
      this.messages = "A user with the same email address exists, please try again with a different email,"+
      " if you created an entry before, please use the link that was produced for you to modify your"+
       " entry.";
    }

  }

  onDonorFeatureCreate(response:any){
    if(response){
      var objectId = response[0].objectId;
      console.log('Donor Feature created with objectID: ',objectId);
      this.donorFormComponent.persistDonor(objectId);
    }else{
      console.log('response problem: ', response);
    }
  }

  onDonorPersisted(url:string){
    console.log('creator link: ',url);
    this.messages = "to edit or delete your entry, visit this link :";
    this.link = window.location+url.slice(1);
    this.showLink = true;
  }

}

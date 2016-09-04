import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';

import { MapService } from '../services/map.service';
import { LocationService } from '../services/location.service';


import Map   = require('esri/map');
import SpatialReference = require('esri/SpatialReference');
import GeomentryService = require('esri/tasks/GeometryService');
import Point = require("esri/geometry/Point");
import FeatureLayer = require('esri/layers/FeatureLayer');
import Popup = require('esri/dijit/Popup');
import InfoTemplate = require('esri/InfoTemplate');
import SimpleFillSymbol = require('esri/symbols/SimpleFillSymbol');

@Component({
  selector: 'esri-map',
  template: '<div><ng-content></ng-content></div>',
  inputs: ['options', 'itemId','locationOptions']
})
export class MapComponent {

  @Output() mapLoaded = new EventEmitter();
  @Output() onLocationClicked = new EventEmitter();
  @Output() onCreateFeature = new EventEmitter();

  map: Map;
  donorsLayer: FeatureLayer;
  GeomentryService:GeomentryService;
  options: any;
  locationOptions: Object;
  locationFocus:boolean = false;
  itemId: string;

  location: Point;

  constructor(private elRef:ElementRef,private _locationService:LocationService,
   private _mapService:MapService) {}

  ngOnInit() {
      // get the device location 
      this._locationService.getLocation(this.locationOptions).subscribe(
        position => {
          this.location = new Point(position.coords.longitude,position.coords.latitude);
        },
        error => {
          console.log(error);
        },
        () =>{
          if(this.map && this.map.loaded){
            // update already loaded map
            this.setUserLocation();
            this.locationFocus = true;
          }
        } 
      );


      // set spatialReference of the map (not required in this specific case)
      this.options.spatialReference = new SpatialReference(4326);


    // create the map
    this._mapService.createMap(this.itemId, this.elRef.nativeElement.firstChild,this.options).then((response) => {
      this.map = response.map;
      console.log(this.map);
      var template = new InfoTemplate();
      template.setContent(this.getTextContent);
      template.setTitle("Donor Information");
      this.donorsLayer = new FeatureLayer(
      "https://services.arcgis.com/GRMbfzH3YjODZfit/arcgis/rest/services/donors/FeatureServer/0", {
      outFields: ["*"],
      mode: FeatureLayer.MODE_SNAPSHOT,
      infoTemplate: template
      });

      // set map feature layer
      this.map.addLayer(this.donorsLayer);

         // console.log('map:',this.map);

      // register location click listener ... only after the layer is added 
      this.map.on('layer-add',(evt)=>{

      this.map.graphics.on("click", (event)=>{
        this.locationClickHandler(event);
      }); 

      });

      this.mapLoaded.next(response);
    });
  }

  setUserLocation(){
    if(this.location && !this.locationFocus){
      this.map.centerAndZoom(this.location,16);    
      this.locationFocus = true;
      this._mapService.placeMarker(this.map,this.location);
    }
  }
 
  locationClickHandler(event:any){
    this.onLocationClicked.emit(event);
  }



  createDonor(model:any){
    var result:boolean;
    this._mapService.createDonorFeature(model,this.donorsLayer,(response) =>{
        console.log(response);
        this.onCreateFeature.emit(response);
      },(error) =>{
        console.log(error);
        this.onCreateFeature.emit(null);
      });
  }


  getTextContent (graphic) {
      var attributes = graphic.attributes;
      var first_name = attributes.first_name;
      var last_name = attributes.last_name;
      var contact_number = attributes.contact_number;
      var email_address = attributes.email_address;
      var blood_type = attributes.blood_type;
      var firstName = "<p><b>First name: </b>" + first_name + "</p><br>";
      var lastName = "<p><b>Last name: </b>" + last_name + "</p><br>";
      var bloodType = "<p><b>Blood type: </b>" + blood_type+ "</p><br>";

      var buttonhtml = "<input type='button' value='view contact' onClick='alert(\"Contact Number: "+
      contact_number+"\\nEmail Address: "+email_address+"\");'/>";
      return  firstName+lastName+bloodType+buttonhtml ;
  }

  // destroy map
  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
    }
  }
}

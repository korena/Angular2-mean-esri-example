import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import Map = require('esri/map');
import arcgisUtils = require('esri/arcgis/utils');
import Search = require('esri/dijit/Search');
import Point = require('esri/geometry/Point');
import PictureMarkerSymbol = require('esri/symbols/PictureMarkerSymbol');
import FeatureLayer = require('esri/layers/FeatureLayer');
import InfoTemplate = require('esri/InfoTemplate');
import Graphic = require('esri/graphic');



@Injectable()
export class MapService {

   constructor(){}

  // load a web map and return respons
  createMap(itemIdOrInfo: any, domNodeOrId: any, options?: Object) {
    return arcgisUtils.createMap(itemIdOrInfo, domNodeOrId, options).then(response => {
      // append layer to response before returning
        //Feature Layer representing donors ...
      response.donorsLayer = new FeatureLayer(
      "https://services.arcgis.com/GRMbfzH3YjODZfit/arcgis/rest/services/donors/FeatureServer", {
      outFields: ["first_name", "last_name", "contact_number","email_address","blood_type"],
      mode: FeatureLayer.MODE_ONDEMAND
      });
      return response;
    });
  };


  // create a search dijit at the dom node
  createSearch(options: Object, domNodeOrId: any) {
    return new Search(options, domNodeOrId);
  };


  // place location marker ...
  placeMarker(map:Map, point:Point){
    var pointSymbol = new PictureMarkerSymbol(
      "http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png",
      20,30);
    var pointInfoTemplate = new InfoTemplate("You Are Here");
    var pointGraphic = new Graphic(point, pointSymbol,null,null);
    map.graphics.add(pointGraphic);
  }

  createDonorFeature(model:any,layer:any,successCallback:any,errorCallback:any){

    var newDonorPoint = new Point(model.longitude,model.latitude);
    var attributes = {
      email_address: model.email_address,
      first_name: model.first_name,
      last_name: model.last_name,
      contact_number: model.contact_number,
      blood_type: model.blood_group
    };
    var newDonorGraphic = new Graphic(newDonorPoint,null,attributes,null);
      layer.applyEdits([newDonorGraphic],
        null,null, 
        successCallback,errorCallback);
  }
}

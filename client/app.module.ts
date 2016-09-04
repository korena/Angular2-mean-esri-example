import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MapComponent } from './core/components/map.component';
import { SearchComponent } from './core/components/search.component';
import { AppComponent }  from './core/components/app.component';
import { DonorFormComponent } from './core/components/create-donor.component';

import { MapService } from './core/services/map.service';
import { LocationService } from './core/services/location.service';
import { PersistenceService } from './core/services/persistence.service';


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ 
    AppComponent, 
    MapComponent, 
    SearchComponent,
    DonorFormComponent
  ],
  providers: [
    MapService,
    LocationService,
    PersistenceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

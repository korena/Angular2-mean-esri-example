# angular2-esri-js-api


# useful starter:

This was built by starting at (https://github.com/tomwayson/angular2-esri-example),
then diving head first into arcGIS api docs.


# Main software components:

Angular2    (RC6)
esri-js-api (3.17)
express
MongoDB

# Scripting language

Typescript


# node package dependencies


    "@angular/common": "2.0.0-rc.6",
    "@angular/compiler": "2.0.0-rc.6",
    "@angular/core": "2.0.0-rc.6",
    "@angular/forms": "2.0.0-rc.6",
    "@angular/http": "2.0.0-rc.6",
    "@angular/platform-browser": "2.0.0-rc.6",
    "@angular/platform-browser-dynamic": "2.0.0-rc.6",
    "@angular/router": "3.0.0-rc.1",
    "@angular/router-deprecated": "2.0.0-rc.2",
    "@angular/upgrade": "2.0.0-rc.5",
    "angular2-template-loader": "^0.5.0",
    "babel-register": "^6.14.0",
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.15.2",
    "cookie-parser": "^1.4.3",
    "copy-webpack-plugin": "^3.0.1",
    "core-js": "^2.4.0",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "html-loader": "^0.4.3",
    "http": "0.0.0",
    "method-override": "^2.3.6",
    "mongoose": "^4.4.19",
    "morgan": "^1.7.0",
    "named-routes": "^2.0.6",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.1.3",
    "rxjs": "5.0.0-beta.11",
    "socket.io": "^1.4.6",
    "webpack-merge": "^0.14.1",
    "zone.js": "^0.6.12"


# node package development dependencies


    "concurrently": "^2.0.0",
    "ts-loader": "^0.8.2",
    "typescript": "^1.8.10",
    "typings": "^1.0.4",
    "webpack": "^1.13.1",
    "babel-cli": "^6.9.0",
    "babel-core": "^6.9.1",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "babel-register": "^6.9.0",
    "babel-runtime": "^6.9.2"



# external dependencies (Global)

Node (tested with 6.5)
npm  (tested with 3.10)
typings (tested with  1.3.3)

# typings

    "core-js": "registry:dt/core-js#0.0.0+20160524134847",
    "arcgis-js-api": "github:Esri/jsapi-resources/3.x/typescript/arcgis-js-api.d.ts",
    "dojo": "registry:dt/dojo#1.9.0+20160521151917"

# How to compile and run

to install typings:

```bash
$ typings install --global github:Esri/jsapi-resources/3.x/typescript/arcgis-js-api.d.ts; \
  typings  install --global --save dt~dojo \
  typings  install --global --save dt~core-js
```

in root directory:

```bash
$ npm install ; npm run webpack:w ; npm start 
```
in browser: 
visit http:localhost:3000

this will bring up the development version, and watch for changes in client
side code (webpack does that)

# Project structure

the project is split between two distinct stacks, server code, contained in
the server folder, and client side code, under the client folder.


All angular/arcGIS related typescript code is in the client folder, with the 
following structure:

/client/app/core/components:
contains a main Angular Component (app.component.ts), and it's childs, namely:
map.component.ts, search.component.ts and create-donor.component.ts

/client/app/core/services:
Contains all the services used by the components of Angular, so far, they are:
map.service.ts:
responsible for communicating with arcGIS services, and is used exclusively
by the map.component.ts module.

location.service.ts:
handles device location, consumed by the map.component.ts

persistence.service.ts:
responsible for communicating with our own server


/cleint/app/core/views:

Contains the templates of the components, linked to uisng "templateUrl" from
component modules.


/client/app/core/models:
Contains a single model (donor.model.js), this directory is meant to host all
the client side models, these are not MongoDB models, but in-browser typescript
classes for front end data organization.


/client/app/core/tests:
Was supposed to host unit tests, never got them ...



and on the server side:

/server/models:

MongoDB models.

/server/socket:
socket.io implementation server side

/server/routes:
express routes


then there are the config files, for all the different components of this 
application.



This project is an implementation attempt for a given expired assignment, and it's in no way complete!. I may or may not finish it depending on time availability, but I think it can be useful to some, especially with arcGIS javascript API usage with typescript and Angular2-rc6. 


Built with:
* [ArcGIS API for JavaScript]
* [Angular 2]
* [TypeScript]

[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/
[Angular 2]:https://angular.io/
[TypeScript]:http://www.typescriptlang.org/

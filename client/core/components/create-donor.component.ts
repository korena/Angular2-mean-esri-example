import { Component, EventEmitter, Output } from '@angular/core';
import { Donor } from '../models/donor.model';
import { PersistenceService } from '../services/persistence.service';

@Component({
  selector: 'donor-form',
  templateUrl:'../views/create-donor-form.view.html'
})
export class DonorFormComponent {


  constructor(private _persistenceService:PersistenceService){}


  @Output() donorModel = new EventEmitter();
  @Output() onDonorModelPersisted = new EventEmitter<string>();

  model:Donor;

  activated:boolean = false;

  groups = ['A', 'A+',
            'B', 'B+','AB','O'];

  onSubmit(){
      // check duplicate email, this should have been done earlier :-)
      this.getUser();
  }

  fillInit(longitude,latitude){
  	this.model = new Donor('','','','','A');
    this.model.longitude = longitude;
    this.model.latitude = latitude;
  }


  getUser(){
    console.log('getting user',this.model);
     this._persistenceService.getUser(this.model).subscribe(
         data => {
           console.log('status:',data.status);
           if(data.status === 200){
           // tell the user to try again ...
           this.donorModel.emit(null);
           this.clearForm();
         }else if(data.status === 204){
           console.log('model: ',this.model);
           this.donorModel.emit(this.model);
         }
          },
         error => console.error(error)
     );
  }


  persistDonor(objectId:any){
    this.model.objectId = objectId;
    var editLink = "/edit/"+this.model.first_name+"/"+this.model.last_name+
    "/"+this.model.objectId;
    this.model.creator_link = editLink;
    this._persistenceService.addUser(this.model).subscribe(
      data => {
        console.log('persistence status:',data.status);
        this.onDonorModelPersisted.emit(this.model.creator_link);
      },
      error => console.error(error),
      () => {
        this.clearForm();
      }
      );
  }

  clearForm(){
    this.model = new Donor('','','','','A');
  }


}

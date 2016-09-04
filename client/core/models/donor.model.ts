export class Donor {
	public _id:any; // to map to mongoose
	public objectId:string;
	public first_name:string;
	public last_name:string;
	public contact_number:string;
	public email_address:string;
	public blood_group:string;
	public creator_link:string;
	public longitude:number;
	public latitude:number;


	constructor(first_name:string,
		last_name:string,
		contact_number:string,
		email_address:string,
		blood_group:string){

		this.last_name = last_name;
		this.first_name = first_name;
		this.contact_number = contact_number;
		this.email_address = email_address;
		this.blood_group = blood_group;
	}
}
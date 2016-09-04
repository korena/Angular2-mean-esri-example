import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PersistenceService {

	private headers = new Headers({'content-type':'application/json','charset':'UTF-8'});
	private options = new RequestOptions({ headers: this.headers });
	

 	constructor (private http: Http) {}


	getUsers(){
		return this.http.get('/api/users').map(res => res.json());
	}

	getUser(user){

		return this.http.get('/api/user/'+user.email_address,this.headers);
	}

    addUser(user) {
        return this.http.post("/api/user", JSON.stringify(user), this.options);
    }

    editUser(user) {
        return this.http.put("/api/user/"+user._id, JSON.stringify(user), this.options);
    }

    deleteUser(user) {
        return this.http.delete("/api/user/"+user._id, this.options);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { User } from 'src/model';

const httpoptions={
    headers:new HttpHeaders({'content-Type':'application/json'})
  };

@Injectable({ providedIn: 'root' })
export class UserService {
    url: string = 'api/users';
    
      
    constructor(public http: HttpClient) { }
    getAll() {
        console.log(this.url);
        return this.http.get<User>(this.url);
    }

    getById(id: number) {
        return this.http.get<User>(this.url);
    }

    addContacts(data: User){
        console.log(data);
        return this.http.post(this.url, {id:Math.random(),Fullname:data.Fullname,Email:data.Email,
        Phone:data.Phone,Company:data.Company,Address:data.Address,Designation:data.Designation}
    ,httpoptions);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

  const options = {
    headers: {
        'Content-Type': 'application/json'/*,
        'Authorization': 'Bearer '.$accessToken*/
    }
  };

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterService {

  constructor(public http: HttpClient) { }

  LoginUser(user,password){
    
    let datos = { 
      user: user,
      password: password
  }
    var apiUrl = 'https://areaprivada.fulp.es/api/Login';

    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }
}

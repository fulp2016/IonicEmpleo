import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(
    public http: HttpClient
    ) { }

    getLogin(user,password){
    
      let datos = { 
          user: user,
          password: password
      }
  
      let options = {
          headers: {
              'Content-Type': 'application/json'/*,
              'Authorization': 'Bearer '.$accessToken*/
          }
      };
      var url = 'https://areaprivada.fulp.es/api/Login';
  
      return this.http.post(url,JSON.stringify(datos),options);
    }

}

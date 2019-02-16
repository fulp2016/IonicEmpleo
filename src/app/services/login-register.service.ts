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

  RegisterUser(data){
    let datos = {  
      Nombre: data.nombre,
      Apellido1: data.apellido1,
      Apellido2: data.apellido2,
      TipoDoc: data.tipoDoc,
      NumDoc: data.nif,
      Email: data.email,
      Sexo: data.sexo,
      FechaNac: data.fechaNac,
      UserName: data.userName,
      Pass: data.pass
    }
    var apiUrl = 'https://areaprivada.fulp.es/api/Register';
    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }
}

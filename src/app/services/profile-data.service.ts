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
export class ProfileDataService {

  constructor(public http: HttpClient) { }

  getPersonalData(CodPersonal){
    
    let datos = { CodPersonal: CodPersonal  }
    var apiUrl = 'https://areaprivada.fulp.es/api/PersonalData';

    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }

  getExtraData(CodPersonal){
    
    let datos = { CodPersonal: CodPersonal  }
    var apiUrl = 'https://areaprivada.fulp.es/api/ExtraData';

    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }

  ActProfileData(CodPersonal,data){
    let datos = {  
      CodPersonal: CodPersonal,
      Nombre: data.nombre,
      Apellido1: data.apellido1,
      Apellido2: data.apellido2,
      Email: data.email,
      Domocilio: data.domicilio,
      Carnet: data.carnet,
      InfoExtra: data.info_extra
    }
    var apiUrl = 'https://areaprivada.fulp.es/api/ActPersonalData';
    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://areaprivada.fulp.es/api/Ofertas';

const options = {
  headers: {
      'Content-Type': 'application/json'/*,
      'Authorization': 'Bearer '.$accessToken*/
  }
};

@Injectable({
  providedIn: 'root'
})
export class OfertasProviderService {

  constructor(public http: HttpClient) { }

  getOfertas(){
    return this.http.get(apiUrl);
  }

  getDetalle(id){
    
    let datos = { 
        idOferta:id
    }

    return this.http.post(apiUrl,JSON.stringify(datos),options);
  }
}

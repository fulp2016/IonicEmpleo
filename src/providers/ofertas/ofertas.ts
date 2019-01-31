import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ListOfertasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfertasProvider {

  constructor(
    public http: HttpClient
    ) {}

    getOfertas(){
      return this.http.get('https://areaprivada.fulp.es/api/Ofertas');
    }

    getDetalle(id){
    
      let datos = { 
          idOferta:id
      }
  
      let options = {
          headers: {
              'Content-Type': 'application/json'/*,
              'Authorization': 'Bearer '.$accessToken*/
          }
      };
      var url = 'https://areaprivada.fulp.es/api/Ofertas';
  
      return this.http.post(url,JSON.stringify(datos),options);
    }

}

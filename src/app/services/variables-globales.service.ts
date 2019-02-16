import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  /*
  public CodPersonal: string = '0';
  public UserName: string = '';
*/
/**
 * Para evitar tener que iniciar sesión durante el desarrollo
 */
  public CodPersonal: string = '63273';
  public UserName: string = 'Jose Robaina';
  
  constructor() { }
}

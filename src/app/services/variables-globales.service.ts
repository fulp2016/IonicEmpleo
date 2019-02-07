import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  
  public CodPersonal: string = '0';
  public UserName: string = '';
  
  constructor() { }
}

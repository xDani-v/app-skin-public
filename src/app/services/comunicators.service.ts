import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicatorsService {

  constructor() { }


  //Comunicador de componente de main para information
  public idInformation = new BehaviorSubject(0);
}

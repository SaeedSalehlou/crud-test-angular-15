import { Injectable } from '@angular/core';
import { CustomerModel } from 'src/app/domain/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

}

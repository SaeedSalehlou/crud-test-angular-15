import { Component } from '@angular/core';
import { LocalStorageService } from './core/services/localStorage/local-storage.service';
import { customerMockData } from './domain/mockData/customer-mock-data';
import { newcustomerMockData } from './domain/mockData/newmockdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'crud-test-angular-latest';
  constructor(private localStorageService: LocalStorageService) {
    // let list = customerMockData;
    let list = newcustomerMockData;
    localStorageService.saveData('customerList', JSON.stringify(list));

  }
}

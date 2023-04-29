import { Injectable } from '@angular/core';
import { CustomerModel } from 'src/app/domain/models/customer.model';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ResponseModel } from 'src/app/domain/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  localStorageKey = 'customerList'
  constructor(private localStorageService: LocalStorageService) { }

  get(): CustomerModel[] {
    let res: CustomerModel[] = JSON.parse(this.localStorageService.getData(this.localStorageKey) || '');
    return res;
  }
  create(newCustomer: CustomerModel): ResponseModel {
    let responseModel: ResponseModel = { message: '', status: false };

    let mockData: CustomerModel[] = this.get();
    const id: number = mockData.length + 1;

    if (!this.checkExist(newCustomer)) {
      mockData.push(
        {
          ...newCustomer, id
        }
      );
      this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
      responseModel.status = true;
      responseModel.message = 'Create Customer Successful';
    }
    else {
      responseModel.status = false;
      responseModel.message = 'The operation failed';
    }
    return responseModel;



  }
  update(updateModel: CustomerModel): ResponseModel {
    let responseModel: ResponseModel = { message: '', status: false };
    let mockData: CustomerModel[] = this.get();
    let check = this.checkExist(updateModel);
    debugger;
    if (!check) {
      mockData[updateModel.id - 1] = updateModel;
      this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
      responseModel.status = true;
      responseModel.message = 'Edit Customer Successful';
    }
    else {
      responseModel.status = false;
      responseModel.message = 'The operation failed';
    }
    return responseModel;

  }
  delete(customerId: number): boolean {
    let mockData: CustomerModel[] = this.get();

    mockData = mockData.filter(
      (model: CustomerModel) => {
        return model.id !== customerId;
      });
    this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
    return true;
  }
  deleteAll(): boolean {
    this.localStorageService.saveData(this.localStorageKey, JSON.stringify([]));
    return true;
  }

  private checkExist(newData: CustomerModel): boolean {
    let data = this.get();
    debugger;
    return data.some(
      (oldData) => {
        return (
          oldData.firstname === newData.firstname &&
          oldData.lastname === newData.lastname &&
          oldData.dateOfBirth === newData.dateOfBirth
        );
      }
    );

  }
}

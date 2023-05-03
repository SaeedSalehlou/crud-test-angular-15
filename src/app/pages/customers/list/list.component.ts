import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { CustomerModel } from 'src/app/domain/models/customer.model';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { ResponseModel } from 'src/app/domain/models/response.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentRow: number = -1;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'dateOfBirth', 'phoneNumber', 'email', 'bankAccountNumber'];
  dataSource: CustomerModel[] = [];

  constructor(
    private customersService: CustomersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.dataSource = this.customersService.get();
  }

  //#region Actions
  addCustomer() {
    let row: CustomerModel = {
      id: 0,
      firstname: '',
      lastname: '',
      dateOfBirth: new Date(),
      phoneNumber: '',
      email: '',
      bankAccountNumber: 0,
    }
    const dialogRef = this.dialog.open(
      EditComponent, {
      data: row,
    });
    dialogRef.afterClosed().
      subscribe(
        (newData: CustomerModel) => {
          if (newData) {
            let response: ResponseModel = this.customersService.create(newData);

            if (response.status) {
              this.loadData();

            }
            else
              alert(response.message)
          }
        }
      );
  }

  editCustomer(row: CustomerModel) {
    const dialogRef = this.dialog.open(
      EditComponent, {
      data: row,
    });
    dialogRef.afterClosed().
      subscribe(
        (newData: CustomerModel) => {
          if (newData) {
            let response: ResponseModel = this.customersService.update(newData);

            if (response.status) {
              this.loadData();

            }
            else
              alert(response.message)
          }
        }
      );
  }
  deleteCustomer(row: CustomerModel) {

    const dialogRef = this.dialog.open(
      DeleteComponent, {
      data: row,
    });

    dialogRef.afterClosed().
      subscribe(
        res => {
          if (res) {
            let res = this.customersService.delete(row.id);
            if (res) {
              this.loadData();
            }
            else {
              alert('The Customer was n\'t Delete.');

            }
          }
        }
      );

  }
  deleteAll() {
    const dialogRef = this.dialog.open(
      DeleteComponent, {
      data: null,
    });
    dialogRef.afterClosed().
      subscribe(
        res => {
          if (res) {
            let res = this.customersService.deleteAll();
            if (res) {
              this.loadData();
            }
            else {
              alert('The Customer was n\'t Delete.');
            }
          }
        }
      );

  }
  //#endregion Actions
}

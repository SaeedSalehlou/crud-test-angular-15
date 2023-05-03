import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerModel } from 'src/app/domain/models/customer.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  customerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerModel
  ) { }

  ngOnInit(): void {
    this._initFormElement()
  }
  private _initFormElement() {
    this.customerForm = new FormGroup({

      id: new FormControl(this.data.id, Validators.required),
      firstname: new FormControl(this.data.firstname, Validators.required),
      lastname: new FormControl(this.data.lastname, Validators.required),
      dateOfBirth: new FormControl(this.data.dateOfBirth, Validators.required),
      phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required, Validators.pattern('([0-9]{3})-([0-9]{3})-([0-9]{4})')]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl(this.data.bankAccountNumber, [Validators.required, Validators.pattern('^[0-9]{9,18}$')]),

    });
  }


  onSaveClick() {
    let newData = this.customerForm.value as CustomerModel;
    this.dialogRef.close(newData);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //#region Validation 
  getEmailErrorMessage() {
    if (this.customerForm.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.customerForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  //#endregion


}


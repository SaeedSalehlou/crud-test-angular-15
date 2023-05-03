import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    CustomersComponent,
    ListComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule
  ]
})
export class CustomersModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [

  {
    path: '', component: CustomersComponent, children: [
      { path: 'list', component: ListComponent },
      { path: 'create', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },

      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

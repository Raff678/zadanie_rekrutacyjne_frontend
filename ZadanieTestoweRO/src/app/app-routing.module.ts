import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRefuelingComponent } from './main-section/general/add-refueling/add-refueling.component';
import {RefuelingHistoryComponent} from './main-section/general/refueling-history/refueling-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'general/addentry', component: AddRefuelingComponent },
  { path: 'general/refuelinghistory', component: RefuelingHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

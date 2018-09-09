import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BulletinsComponent } from './bulletins/bulletins.component';
import { BulletinChangeComponent } from './bulletin-change/bulletin-change.component';

const routes: Routes = [
  { path: '', redirectTo:'/bulletins', pathMatch: 'full'},
  { path:'bulletins', component: BulletinsComponent },
  { path:'bulletin-change/:id', component: BulletinChangeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], 
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }

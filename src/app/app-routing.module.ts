import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './database/database.component';

const routes: Routes = [
  { path: '', redirectTo: '/empdata', pathMatch: 'full' },
  { path: 'empdata', component: DatabaseComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

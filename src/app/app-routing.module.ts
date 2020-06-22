import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IetrComponent } from './components/ietr/ietr.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'ietrlist', component: IetrComponent },
  { path: 'mainpage', component: MainpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ IetrComponent, MainpageComponent ];
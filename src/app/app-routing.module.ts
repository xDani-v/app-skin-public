import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaneldermatologoComponent } from './paneldermatologo/paneldermatologo.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dermatologos', component: PaneldermatologoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

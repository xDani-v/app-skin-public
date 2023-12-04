import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InformacionComponent } from './informacion/informacion.component';
import { MainComponent } from './main/main.component';
import { PaneldermatologoComponent } from './paneldermatologo/paneldermatologo.component';
import { AyudaComponent } from './ayuda/ayuda.component';

@NgModule({
  declarations: [
    AppComponent,
    InformacionComponent,
    MainComponent,
    PaneldermatologoComponent,
    AyudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

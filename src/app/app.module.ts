import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemeComponent } from './probleme/probleme.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemeComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

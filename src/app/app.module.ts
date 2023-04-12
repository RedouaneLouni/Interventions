import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccueilComponent } from './accueil/accueil.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme/probleme-data';
import { TypeproblemeService } from './probleme/typeprobleme.service';

@NgModule({
  declarations: [
    AppComponent,
    ProblemeComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 })
  ],
  providers: [TypeproblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

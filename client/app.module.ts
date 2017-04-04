import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { ChartModule }   from 'angular2-highcharts';

@NgModule({
  imports:      [ BrowserModule,ChartModule.forRoot(require('highcharts')) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

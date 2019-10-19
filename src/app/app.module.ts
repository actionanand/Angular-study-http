import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeartBeatComponent } from './loading-spinner/heart-beat/heart-beat.component';
import { CoupleDotsComponent } from './loading-spinner/couple-dots/couple-dots.component';
import { HeartSpinnerComponent } from './loading-spinner/heart-spinner/heart-spinner.component';
import { TappingHandsComponent } from './loading-spinner/tapping-hands/tapping-hands.component';
import { ChargingComponent } from './loading-spinner/charging/charging.component';

@NgModule({
  declarations: [
    AppComponent,
    HeartBeatComponent,
    CoupleDotsComponent,
    HeartSpinnerComponent,
    TappingHandsComponent,
    ChargingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

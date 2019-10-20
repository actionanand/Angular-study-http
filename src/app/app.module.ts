import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeartBeatComponent } from './loading-spinner/heart-beat/heart-beat.component';
import { CoupleDotsComponent } from './loading-spinner/couple-dots/couple-dots.component';
import { HeartSpinnerComponent } from './loading-spinner/heart-spinner/heart-spinner.component';
import { TappingHandsComponent } from './loading-spinner/tapping-hands/tapping-hands.component';
import { ChargingComponent } from './loading-spinner/charging/charging.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LogInterceptorService } from './log-interceptor.service';

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
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

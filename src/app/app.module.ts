import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './core/interceptors/http.interceptor';
import { HTTPService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HTTPService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

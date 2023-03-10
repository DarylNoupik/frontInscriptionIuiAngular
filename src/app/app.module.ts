import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {TokenInterceptorProvider} from "./_helpers/token.interceptor";
import {JwtHelperService} from "@auth0/angular-jwt";
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TokenInterceptorProvider,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

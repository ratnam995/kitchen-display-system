import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpModule, Http } from "@angular/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KitchenDashboardModule } from './modules/kitchen-dashboard/kitchen-dashboard.module';
import { HttpService } from "./shared/services/http-service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    KitchenDashboardModule
  ],
  providers: [ HttpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

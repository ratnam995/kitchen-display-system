import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { KitchenDashboardModule } from "./modules/kitchen-dashboard/kitchen-dashboard.module";
import { HttpService } from "./shared/services/http-service";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { NotificationService } from "./shared/services/notification-service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    KitchenDashboardModule
  ],
  providers: [NotificationService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}

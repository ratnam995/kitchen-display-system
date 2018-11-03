import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KitchenDashboardComponent } from "./kitchen-dashboard.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "",
    component: KitchenDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenDashboardRoutingModule {}

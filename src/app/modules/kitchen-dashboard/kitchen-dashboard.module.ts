import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KitchenDashboardRoutingModule } from "./kitchen-dashboard-routing.module";
import { KitchenDashboardComponent } from "./kitchen-dashboard.component";
import { GridCmpModule } from "../../shared/modules/grid-cmp/grid-cmp.module";

@NgModule({
  imports: [CommonModule, KitchenDashboardRoutingModule, GridCmpModule],
  declarations: [KitchenDashboardComponent]
})
export class KitchenDashboardModule {}

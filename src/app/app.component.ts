import { Component, ViewContainerRef } from "@angular/core";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  private viewContainerRef: ViewContainerRef;

  constructor(
    viewContainerRef: ViewContainerRef,
    private toastr: ToastsManager,
    private router: Router
  ) // , private translate: TranslateService
  {
    this.toastr.setRootViewContainerRef(viewContainerRef);
    this.viewContainerRef = viewContainerRef;
  }
}

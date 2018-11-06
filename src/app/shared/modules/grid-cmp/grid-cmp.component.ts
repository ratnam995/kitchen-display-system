import { Component, OnInit, Input } from "@angular/core";
import io from "socket.io-client";
import { HttpService } from "../../../shared/services/http-service";
import * as FileSaver from "file-saver";
import { NotificationService } from "../../services/notification-service";
import { IfObservable } from "rxjs/observable/IfObservable";

@Component({
  selector: "app-grid-cmp",
  templateUrl: "./grid-cmp.component.html",
  styleUrls: ["./grid-cmp.component.css"]
})
export class GridCmpComponent implements OnInit {
  private url = "http://13.232.62.50:3030";
  // private url = "http://localhost:3030";
  private socket;

  @Input()
  headerList: any[];
  @Input()
  dataList: any[];
  @Input()
  actionList: any[];

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.socket = io.connect(this.url);
    this.socket.on("OrderPlaced", data => {
      console.log("OrderPlaced: " + JSON.stringify(data));
      this.dataList.push(data);
    });
    this.socket.on("OrderCompleted", data => {
      console.log("OrderCompleted: ", JSON.parse(JSON.stringify(data)));
      this.fetchCompleteOrderList();
    });
    if (this.dataList.length === 0) {
      this.fetchCompleteOrderList();
    }
  }

  fetchCompleteOrderList() {
    this.httpService.getAll("fetchOrders", {}).subscribe(
      res => {
        console.log("fetchOrders res", res);
        if (res && res.hasOwnProperty("success") && !res.success) {
          this.notificationService.error("Unable to fetch order list", "Error");
          this.dataList = [];
        } else {
          let doneList = JSON.parse(JSON.stringify(res)).filter(
            singleRes =>
              singleRes.status === true || singleRes.status === "true"
          );
          let pendingList = JSON.parse(JSON.stringify(res)).filter(
            singleRes =>
              !(singleRes.status === true || singleRes.status === "true")
          );
          this.dataList = doneList
            .concat(pendingList)
            .map(singleRes => singleRes);
        }
      },
      err => {
        console.log("fetchOrders err", err);
      }
    );
  }

  processActions(act, orderData) {
    this.httpService.store("completeOrder", orderData).subscribe(
      orderCompleteRes => {
        console.log("orderCompleteRes", orderCompleteRes);
        if (
          orderCompleteRes &&
          orderCompleteRes.hasOwnProperty("success") &&
          !orderCompleteRes.success
        ) {
          this.notificationService.error("Unable to complete action", "Error");
        }
        // this.fetchCompleteOrderList();
      },
      orderCompleteErr => {
        console.log("orderCompleteErr", orderCompleteErr);
      }
    );
  }

  onDownloadReportClick() {
    this.httpService.store("downloadpdf", {}).subscribe(
      res => {
        console.log("PDF generation response", JSON.parse(JSON.stringify(res)));
        FileSaver.saveAs(new Blob([res], { type: "application/pdf" }), "");
      },
      err => {
        console.log("PDF generation error", err);
      }
    );
  }
}

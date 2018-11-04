import { Component, OnInit, Input } from "@angular/core";
import io from "socket.io-client";
import { HttpService } from "../../../shared/services/http-service";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-grid-cmp",
  templateUrl: "./grid-cmp.component.html",
  styleUrls: ["./grid-cmp.component.css"]
})
export class GridCmpComponent implements OnInit {
  private url = "http://localhost:3030";
  private socket;

  @Input()
  headerList: any[];
  @Input()
  dataList: any[];
  @Input()
  actionList: any[];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.socket = io.connect(this.url);
    this.socket.on("OrderPlaced", data => {
      console.log("OrderPlaced: " + JSON.stringify(data));
      // this.todos.push(data.todo);
      this.dataList.push(data);
    });
    this.socket.on("OrderCompleted", data => {
      console.log("OrderCompleted: ", JSON.parse(JSON.stringify(data)));
      // this.todos.push(data.todo);
      // this.dataList.push(data);
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
        this.dataList = JSON.parse(JSON.stringify(res));
      },
      err => {
        console.log("fetchOrders err", err);
      }
    );
  }

  processActions(act, orderData) {
    console.log("act", act);
    console.log("orderData", orderData);
    this.httpService.store("completeOrder", orderData).subscribe(
      orderCompleteRes => {
        console.log("orderCompleteRes", orderCompleteRes);
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

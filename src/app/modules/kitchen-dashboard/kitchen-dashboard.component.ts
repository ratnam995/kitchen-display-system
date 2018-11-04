import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../shared/services/http-service";

@Component({
  selector: "app-kitchen-dashboard",
  templateUrl: "./kitchen-dashboard.component.html",
  styleUrls: ["./kitchen-dashboard.component.css"]
})
export class KitchenDashboardComponent implements OnInit {

  headerList: any[] = [];
  dataList: any[] = [];
  actionList: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.setGridProperty();
  }

  setGridProperty() {
    this.headerList = [
      { header: "Name", mapTo: "dishname" },
      { header: "Quantity", mapTo: "qty" },
      { header: "Created-till-now", mapTo: "createdtillnow" },
      { header: "Predicted", mapTo: "predictedqty" },
      { header: "Status" }
    ];

    // this.dataList = [
    //   {
    //     dishName: "Jumbo Chicken Wrap",
    //     dishQty: "1",
    //     dishCTN: "14",
    //     dishPrediction: "123"
    //   },
    //   {
    //     dishName: "Vegetarian Lasagne",
    //     dishQty: "2",
    //     dishCTN: "23",
    //     dishPrediction: "456"
    //   }
    // ];

    this.actionList = [
      {
        type: "done",
        visible: true,
        text: "Done",
        icon: "fa fa-eye",
        action: "emit"
      }
    ];
  }
}

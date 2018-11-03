import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-kitchen-dashboard",
  templateUrl: "./kitchen-dashboard.component.html",
  styleUrls: ["./kitchen-dashboard.component.css"]
})
export class KitchenDashboardComponent implements OnInit {
  headerList: any[] = [];
  dataList: any[] = [];
  actionList: any[] = [];

  constructor() {}

  ngOnInit() {
    this.setGridProperty();
  }

  setGridProperty() {
    this.headerList = [
      { header: "Name", mapTo: "dishName" },
      { header: "Quantity", mapTo: "dishQty" },
      { header: "Created-till-now", mapTo: "dishCTN" },
      { header: "Predicted", mapTo: "dishPrediction" },
      { header: "Status" }
    ];

    this.dataList = [
      {
        dishName: "Jumbo Chicken Wrap",
        dishQty: "1",
        dishCTN: "14",
        dishPrediction: "123"
      },
      {
        dishName: "Vegetarian Lasagne",
        dishQty: "2",
        dishCTN: "23",
        dishPrediction: "456"
      }
    ];

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

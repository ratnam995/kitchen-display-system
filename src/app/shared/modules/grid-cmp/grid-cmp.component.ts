import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-cmp',
  templateUrl: './grid-cmp.component.html',
  styleUrls: ['./grid-cmp.component.css']
})
export class GridCmpComponent implements OnInit {

  @Input() headerList:any[];
  @Input() dataList:any[];
  @Input() actionList:any[];

  constructor() { }

  ngOnInit() {
  }

}

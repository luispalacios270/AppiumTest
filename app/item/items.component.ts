import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
  items: Item[];
  textToChange = "";
  shouldShowElement = true;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
}

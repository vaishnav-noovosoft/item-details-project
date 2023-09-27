import { Component, OnInit } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  canSave =  true;
  isSpecial = true;
  isUnchanged = true;

  isActive = true;
  nullCustomer: string | null = null;
  currentCustomer = {
    name: 'Laura'
  };

  item!: Item; // defined to demonstrate template context precedence
  items: Item[] = [];

  currentItem!: Item;



  // trackBy change counting
  itemsNoTrackByCount   = 0;
  itemsWithTrackByCount = 0;
  itemsWithTrackByCountReset = 0;
  itemIdIncrement = 1;

  currentClasses: Record<string, boolean> = {};

  currentStyles: Record<string, string> = {};

  ngOnInit() {
    console.log('ng on it')
    this.resetItems();
    this.setCurrentClasses();
    this.setCurrentStyles();
    this.itemsNoTrackByCount = 0;
  }

  setUppercaseName(name: string) {
    this.currentItem.name = name.toUpperCase();
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses =  {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special:  this.isSpecial
    };
  }

  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'font-style':  this.canSave      ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
      'font-size':   this.isSpecial    ? '24px'   : '12px'
    };
  }

  isActiveToggle() {
    this.isActive = !this.isActive;
  }

  giveNullCustomerValue() {
    this.nullCustomer = 'Kelly';
  }

  resetItems() {
    console.log("reset");
    this.items = Item.items.map(item => item.clone());
    console.log(this.items[0]);
    this.currentItem = this.items[0];

    // Before
    // this.item = this.currentItem
    this.item = Object.assign({}, this.currentItem); // Now
  }

  resetList() {
    console.log('reset list');
    this.resetItems();
    this.itemsWithTrackByCountReset = 0;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
  }

  changeIds() {
    console.log('change ids')
    this.items.forEach(i => i.id += this.itemIdIncrement);
    this.itemsWithTrackByCountReset = -1;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
    this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
  }

  clearTrackByCounts() {
    console.log('track by counts')
    this.resetItems();
    this.itemsNoTrackByCount = 0;
    this.itemsWithTrackByCount = 0;
    this.itemIdIncrement = 1;
  }
  trackByItems(index: number, item: Item): number {
    console.log('track by items')
    return item.id;
  }

  trackById(index: number, item: any): number {
    console.log('track by id')
    return item.id;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}





/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.scss']
})
export class ReturnButtonComponent {
  constructor(private location: Location) {}

  return() {
    this.location.back();
  }
}

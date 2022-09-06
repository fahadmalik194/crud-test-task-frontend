import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  currentUser: any;
  constructor() {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
  }
}

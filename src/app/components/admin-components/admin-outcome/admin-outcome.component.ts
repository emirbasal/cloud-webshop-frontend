import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-outcome',
  templateUrl: './admin-outcome.component.html',
  styleUrls: ['./admin-outcome.component.css']
})
export class AdminOutcomeComponent implements OnInit {

  @Input() outcome: any
  @Input() currency: string

  constructor() { }

  ngOnInit(): void {
  }
}

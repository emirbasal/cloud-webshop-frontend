import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public onCloseModal(): void {
    this.closeModal.emit()
  }
}

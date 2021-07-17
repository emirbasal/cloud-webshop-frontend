import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webshop';

  public modalVisible: boolean = false;

  public toggleModal(): void {
    this.modalVisible = !this.modalVisible
  }

}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: '[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit, OnChanges {

  @Input() iconName: string
  @Input() iconAlt: string

  public iconPath: string

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPath()
  }

  private setPath(): void {
    this.iconPath = `assets/icons/${this.iconName}.svg`
  }

}

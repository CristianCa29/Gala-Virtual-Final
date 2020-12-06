import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gala3d',
  templateUrl: './gala3d.component.html',
  styleUrls: ['./gala3d.component.scss']
})
export class Gala3dComponent implements OnInit {
  @Output() streaming=false;
  constructor() { }

  ngOnInit(): void {
  }

  invocarStreaming():void{
    this.streaming=true;
  }

}

import { Component, OnInit } from '@angular/core';
import { InspectorService } from './shared/inspector.service';

@Component({
  selector: 'app-inspector-view',
  templateUrl: './inspector-view.component.html',
  styleUrls: ['./inspector-view.component.css'],
  providers: [InspectorService]
})
export class InspectorViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

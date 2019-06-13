import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-submit',
  templateUrl: './display-submit.component.html',
  styles: ['.dispData { font-size: 30px; margin-left: 20px; }']
})
export class DisplaySubmitComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

	formValues: object;

  ngOnInit() {
		this.formValues = this.route.snapshot.params;
		// console.log(this.formValues);
  }

}

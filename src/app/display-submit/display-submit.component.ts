import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-submit',
  template: `<h1>
	  You have entered the following information:
	</h1>

	<div class="dispData">
		<p>
		  Form Values: {{ formValues | json }}
		</p>

		<p>
			<a routerLink="/" routerLinkActive="active">Go Back</a>
		</p>
	</div>
`,
  styles: ['.dispData { font-size: 30px; margin-left: 20px; }']
})
export class DisplaySubmitComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

	formValues: object;

  ngOnInit() {
		this.formValues = this.route.snapshot.params;
  }
}

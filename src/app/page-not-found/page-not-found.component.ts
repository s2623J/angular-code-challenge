import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<h1>Error: Page not found.</h1>

	<div class="dispData">
		<a routerLink="/" routerLinkActive="active">Go back to form</a>
	</div>
`,
	styles: ['.dispData { font-size: 30px; margin-left: 20px; }']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

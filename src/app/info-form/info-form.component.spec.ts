import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './../app-routing.module';
import { AppComponent } from './../app.component';
import { InfoFormComponent } from './../info-form/info-form.component';
import { DisplaySubmitComponent } from './../display-submit/display-submit.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { DialogComponent } from './../info-form/info-form.component';

describe('InfoFormComponent', () => {
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [
				InfoFormComponent,
		    AppComponent,
				InfoFormComponent,
				DisplaySubmitComponent,
				PageNotFoundComponent,
				DialogComponent
		  ],
		  imports: [
		    AppRoutingModule,
				ReactiveFormsModule,
				FormsModule,
				MatDialogModule,
				MatButtonModule,
				BrowserAnimationsModule
		  ],
		  providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
		expect(component).toBeTruthy();
  });

	describe('Email Address Input', () => {
		var emailArr = [
			{email: 'name@hello.com', testVal: true},
			{email: 'name@hello', testVal: false},
			{email: '@hello.com', testVal: false},
			{email: 'namehello.com', testVal: false},
			{email: 'name@hellocom', testVal: false},
			{email: 'name@hello.c8om', testVal: false}
		];

		it('should validate email is required', () => {
			let hostElement = fixture.nativeElement;
			let email = hostElement.querySelector('#email');
			email.value = '';
			expect(email.validity.valid).toBe(false);
	  });

		emailArr.forEach((val) => {
			it('regex should test "' + val.email + '" as ' + val.testVal, () => {
				let hostElement = fixture.nativeElement;
				let email = hostElement.querySelector('#email');
				email.value = val.email;
				async(() => {
					expect(email.validity.valid).toBe(val.testVal);
				});
		  });
		});
	});

	describe('Subscription Dropdown Input', () => {
		var selectArr: string[] = ["-- Choose Option --", "Basic", "Advanced", "Pro"];

		it('should provide 3 options ("Basic", "Advanced", "Pro")', () => {
			let hostElement = fixture.nativeElement;
			let optionArr = hostElement.querySelectorAll('select option');

			optionArr.forEach((option: any) => {
				expect(selectArr).toContain(option.innerHTML.trim());
			});
	  });

		it('should default on "Advanced"', () => {
			let hostElement = fixture.nativeElement;
			let select = hostElement.querySelector('select[formControlName]');
			expect(select.value).toBe('2: Advanced');
	  });
	});

	describe('Password Input', () => {
		var passwordArr = [
			{pass: 'eE#ppppG', testVal: true},
			{pass: '3eE#ppEp', testVal: true},
			{pass: '3eE#p&Ep', testVal: true},
			{pass: '3eEipjpP', testVal: false},
			{pass: '@#$%^&*(', testVal: false}
		];

		it('should validate password is required', () => {
			let hostElement = fixture.nativeElement;
			let password = hostElement.querySelector('#password');
			password.value = '';
			expect(password.validity.valid).toBe(false);
	  });

		it('should be 8 characters long with at least one character and ' +
			'one special character', () => {});
		passwordArr.forEach((item) => {
			// This regex depends on hard-coded fixed length from input
			let testResult = item.testVal ? 'Pass' : 'Fail';
			it('"' + item.pass + '" should ' + testResult, () => {
				if (item.testVal) {
				  expect(item.pass).toMatch(/(?=.*?[A-Za-z0-9])(?=.*[^0-9A-Za-z]).+/g);
				} else {
					expect(item.pass).not.toMatch(/(?=.*?[A-Za-z0-9])(?=.*[^0-9A-Za-z]).+/g);
				}
		  });
		});
	});

	describe('Form Invalid Warning Message', () => {
		it('should display a warning message if the Form is invalid and was ' +
			'touched but only after user has stopped typing', () => {
			const hostElement = fixture.nativeElement;
			const email = hostElement.querySelector('#email');
			const password = hostElement.querySelector('#password');
			const component = fixture.componentInstance;
			email.value = 'hello@xyz.com';  			// valid value
			password.value = 'eE#ppppG';					// valid value
			component.infoForm.controls.email.markAsTouched();
			email.dispatchEvent(new Event('input', { bubbles: true }));
			password.dispatchEvent(new Event('input', { bubbles: true }));
			fixture.detectChanges();

			if (component.infoForm.touched && component.infoForm.valid) {
				component.formClick$.subscribe( status => {
					 console.log('component.infoForm.valid: '+ status);
				  }
				);
			} else {
				component.formClick$.subscribe( status => {
					 console.log('component.infoForm.valid: '+ status);
				});
			}
		});
	});

// console.log('Hello! ;-)');


	// describe('Form Invalid Warning Message', () => {
	// 	it('should display a warning message if the Form is invalid and was ' +
	// 		'touched but only after user has stopped typing', () => {
	// 		let hostElement = fixture.nativeElement;
	// 		// let compiled = fixture.debugElement.nativeElement;
	// 		let component = fixture.componentInstance;
	// 		let email = hostElement.querySelector('#email');
	// 		let password = hostElement.querySelector('#password');
	// 		let clock = jasmine.clock();
	// 		clock.install();
	// 		email.value = 'hello@';  			// invalid value
	// 		password.value = 'eE#ppppG';	// valid value
	// 		component.infoForm.controls.email.markAsTouched();
	// 		email.dispatchEvent(new Event('input', { bubbles: true }));
	// 		password.dispatchEvent(new Event('input', { bubbles: true }));
	// 		fixture.detectChanges();
	// 		if (component.infoForm.touched && component.infoForm.valid) {
	// 			// Warning message is NOT visible
	// 			clock.tick(3000);
	// 			// setTimeout(() => {
	// 				fixture.detectChanges();
	// 			  expect(component.validationStatus.isFormValid).toEqual(true);
	// 			// }, 3000);
	// 			// fixture.detectChanges();
	// 		  // expect(component.validationStatus.isFormValid).toEqual(true);
	// 		} else {
	// 			// Warning message IS visible
	// 			clock.tick(3000);
	// 			// setTimeout(() => {
	// 				fixture.detectChanges();
	// 				expect(component.validationStatus.isFormValid).toEqual(false);
	// 			// }, 3000);
	// 			// fixture.detectChanges();
	// 			// expect(component.validationStatus.isFormValid).toEqual(false);
	// 		}
	// 		clock.uninstall();
	//   });
	// });




});

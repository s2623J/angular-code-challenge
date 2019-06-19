import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";

import { Observable} from 'rxjs';
import { AppRoutingModule } from './../app-routing.module';
import { AppComponent } from './../app.component';
import { InfoFormComponent } from './../info-form/info-form.component';
import { DisplaySubmitComponent } from './../display-submit/display-submit.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';

describe('InfoFormComponent', () => {
	let location: Location;
  let router: Router;
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [
				InfoFormComponent,
		    AppComponent,
				InfoFormComponent,
				DisplaySubmitComponent,
				PageNotFoundComponent
		  ],
		  imports: [
		    AppRoutingModule,
				ReactiveFormsModule,
				FormsModule,
				MatDialogModule,
				MatButtonModule,
				BrowserAnimationsModule,
				RouterTestingModule.withRoutes([
				  { path: '', component: InfoFormComponent },
				  { path: 'displaySubmit', component: DisplaySubmitComponent },
				  { path: '**', component: PageNotFoundComponent }
				])
		  ],
		  providers: []
    })
    .compileComponents();

		router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
		jasmine.clock().install();
  });

	afterEach(() => {
	    jasmine.clock().uninstall();
	});

	function awaitStream(stream$: Observable<any>, skipTime?: number) {
	  let response = null;
	  stream$.subscribe(data => {
	    response = data;
	  });
	  if (skipTime) {
	    /**
	     * use jasmine clock to artificially manipulate time-based web apis
			 * like setTimeout and setInterval we can easily refactor this and use
			 * async/await but that means that we will have to actually wait out
			 * the time needed for every delay/mock request
	     */
	    jasmine.clock().tick(skipTime);
	  }
	  return response;
	}

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

	describe('Form (Invalid) Warning Message', () => {
		it('should display a warning message if the Form is invalid and was ' +
			'touched but only after user has stopped typing', () => {
			let hostElement = fixture.nativeElement;
			let email = hostElement.querySelector('#email');
			let password = hostElement.querySelector('#password');
			let component = fixture.componentInstance;
			email.value = 'hello@xyz.com';  			// valid value
			password.value = 'eE#ppppG';					// valid value
			component.infoForm.markAsTouched();
			email.dispatchEvent(new Event('input', { bubbles: true }));
			password.dispatchEvent(new Event('input', { bubbles: true }));
			fixture.detectChanges();

			awaitStream(component.formClick$, 1000);
			expect(component.validationStatus.isFormValid).toEqual(true);
		});
	});

	describe('Form Field Warning Messages: ', () => {
		it('should display a warning message below each input if it is invalid ' +
		'and cumulative message at the top of the form with all the errors at ' +
		'the top of the form on submit.', () => {
			let hostElement = fixture.nativeElement;
			let email = hostElement.querySelector('#email');
			let password = hostElement.querySelector('#password');
			let component = fixture.componentInstance;
			let controlObj: object = component.infoForm.controls;
			let testValObj = {
				email: 		['xyz@', 'isEmailValid'],
				password:	['3eEipjpP', 'isPassValid']
			}
			for (let key in controlObj) {
			  if (key != 'subscription') {
					let ctrlObj = controlObj[key];
					ctrlObj.value = testValObj[key][0];
					expect(ctrlObj.valid).toEqual(false);
					expect(component.infoForm.valid).toEqual(false);
					email.dispatchEvent(new Event('input', { bubbles: true }));
					password.dispatchEvent(new Event('input', { bubbles: true }));
					fixture.detectChanges();
					awaitStream(component.formClick$, 2000);
					expect(component.validationStatus[testValObj[key][1]]).toEqual(false);
			  }
			}
		});
	});

	describe('Discarding changes modal dialog', () => {
		it('should launch dialog shen clicking on "Clear" button', () => {
			spyOn(component, 'clearInputs');
		  let button = fixture.debugElement.nativeElement.querySelector('#clear');
		  button.click();
			fixture.detectChanges();
		  fixture.whenStable().then(() => {
		    expect(component.clearInputs).toHaveBeenCalled();
		  });
		});
	});

	describe('Submitting Form', () => {
		it('should send form data when "Submit" is clicked', () => {
			spyOn(component, 'onSubmit');
		  let button = fixture.debugElement.nativeElement.querySelector('#submit');
			let hostElement = fixture.nativeElement;
			let email = hostElement.querySelector('#email');
			let password = hostElement.querySelector('#password');
			let subscription = hostElement.querySelector('#subscription');
		  button.click();
			fixture.detectChanges();
			fixture.whenStable().then(() => {
				expect(component.infoForm.value.email).toEqual(email.value);
				expect(component.infoForm.value.password).toEqual(password.value);
				expect(component.infoForm.value.subscription).toEqual(subscription.value.split(' ')[1]);
			});
		});

		it('navigate to "displaySubmit" takes you to /displaySubmit', fakeAsync(() => {
	    router.navigate(["displaySubmit"]).then(() => {
	      expect(location.path()).toBe("/displaySubmit");
	    });
	  }));
	});
});

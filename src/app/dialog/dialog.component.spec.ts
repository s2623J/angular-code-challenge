import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
			providers: [{
				  provide: MatDialogRef,
				  useValue: {}
				}, {
				  provide: MAT_DIALOG_DATA,
				  useValue: {} // Add any data you wish to test if it is passed/used correctly
			}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('dialog should ask "Pressing "OK" will clear the form.Do you want to proceed?"', () => {
		let hostElement = fixture.nativeElement;
		let prompt = hostElement.querySelector('h2');
    expect(prompt.innerHTML.trim()).toBe(`Pressing "OK" will clear the form.Do you want to proceed?`);
  });

	it('should pass "false" value when User clicks on "Cancel" button', () => {
	  let button = fixture.debugElement.nativeElement.querySelector('#btnCancel');
		spyOn(component, 'onClick');
	  button.click();
		fixture.detectChanges();
	  fixture.whenStable().then(() => {
	    expect(component.onClick).toHaveBeenCalledWith(false);
	  });
  });

	it('should pass "true" value when User clicks on "OK" button', () => {
	  let button = fixture.debugElement.nativeElement.querySelector('#btnOK');
		spyOn(component, 'onClick');
	  button.click();
		fixture.detectChanges();
	  fixture.whenStable().then(() => {
	    expect(component.onClick).toHaveBeenCalledWith(true);
	  });
  });
});

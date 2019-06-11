import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef  } from '@angular/material';

import { fromEvent , Subscription} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit, OnDestroy  {

	subscriptionArr:	string[] = [ 'Basic', 'Advanced', 'Pro' ];
	validationStatus = {
		isFormValid: 	true,
		isEmailValid: true,
		isPassValid: 	true
	}
	formClick: Subscription;
	passPattern = /^(?:[a-zA-Z]|[^a-zA-Z0-9]){8}$/g;

	infoForm: FormGroup = this.fb.group({
    email: 				['', [Validators.required, Validators.email]],
		subscription:	['', Validators.required],
    password: 		['', [Validators.required, Validators.pattern(this.passPattern)]]
	});

	private setDefaultSelectValue() {
		this.infoForm.controls['subscription']
			.setValue(this.subscriptionArr[1], {onlySelf: true});
	}

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
		private router: Router) {
		this.setDefaultSelectValue();
	}

	ngOnInit() {
		this.formClick = fromEvent(document.querySelector('#frmInfo'), 'keyup')
			.pipe(
				// wait 700ms after each keystroke before considering the term
	      debounceTime(700),
	      distinctUntilChanged()
			)
			.subscribe(() => {
				let frmInfo = this.infoForm;
				let status = this.validationStatus;
				status.isFormValid = frmInfo.valid;
				status.isEmailValid = frmInfo.controls.email.valid;
				status.isPassValid = frmInfo.controls.password.valid;
			});
	}

	ngOnDestroy() {
		this.formClick.unsubscribe();
	}

	clearInputs() {
		this.openDialog();
	}

	openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: false,
			data: {
        clearForm: false
      }
    });

    dialogRef.afterClosed()
			.subscribe((clearForm) => {
				if (clearForm) {
					this.infoForm.reset();
					this.setDefaultSelectValue();
				}
	    });
  }

	onSubmit() {
		console.warn(this.infoForm.value);
		this.router.navigate(['displaySubmit', this.infoForm.value]);
	}
}

////////////////////////////////////////////////////////////////////////
///////////////////////  Dialog Modal Begin  ///////////////////////////
////////////////////////////////////////////////////////////////////////

export interface DialogData {
	clearForm: false
}

@Component({
  selector: 'app-dialog',
	template: `
    <h1 mat-dialog-title>Discarding Changes:</h1>
    <mat-dialog-content>
      Pressing "OK" will clear the form.Do you want to proceed?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClick(true)">OK</button>
      <button mat-button (click)="onClick(false)">Cancel</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {

  constructor( public dialogRef: MatDialogRef<DialogComponent> ) { }

	clearForm = false;

	onClick(val: boolean) {
		this.dialogRef.close(val);
	}
}

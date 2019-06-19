import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material';
import { DialogComponent } from './../dialog/dialog.component';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent  {

	subscriptionArr:	string[] = [ 'Basic', 'Advanced', 'Pro' ];
	emailPattern = /^.+@[^\.].*\.[a-z]{2,}$/g;
	passPattern = /(?=.*?[A-Za-z0-9])(?=.*[^0-9A-Za-z]).+/g;
	validationStatus = {
		isFormValid: 	true,
		isEmailValid: true,
		isPassValid: 	true
	}
	infoForm: FormGroup = this.fb.group({
    email: 				['', [
			Validators.required,
			Validators.pattern(this.emailPattern),
			Validators.email
		]],
		subscription:	['', Validators.required],
    password: 		['', [
			Validators.required,
			Validators.pattern(this.passPattern),
			Validators.minLength(8),
			Validators.maxLength(8)
		]]
	});
	formClick$ = this.infoForm.valueChanges
		.pipe(
			// wait 700ms after each keystroke before considering the validation
			debounceTime(700),
			distinctUntilChanged()
		);

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
		this.formClick$
			.subscribe(() => {
				let frmInfo = this.infoForm;
				let email = this.infoForm.controls.email;
				let password = this.infoForm.controls.password;
				let status = this.validationStatus;
				let isFormReset = frmInfo.controls.email.value == null &&
					frmInfo.controls.password.value == null;

				status.isFormValid = frmInfo.valid;
				status.isEmailValid = email.valid;
				status.isPassValid = password.valid;

			  if (frmInfo.valid || isFormReset) {
					status.isEmailValid = true;
					status.isPassValid = true;
					status.isFormValid = true;
				}
		});
	}

	clearInputs() {
		this.openDialog();
	}

	private openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: false,
			data: {
        clearForm: false
      }
    });

    dialogRef.afterClosed()
			.subscribe((clearForm) => {
				if (clearForm) {
					let status = this.validationStatus;
					this.infoForm.reset();
					status.isFormValid = true;
					status.isEmailValid = true;
					status.isPassValid = true;
					this.setDefaultSelectValue();
				}
	    });
  }

	onSubmit() {
		let frmInfo = this.infoForm;
		let status = this.validationStatus;
		status.isEmailValid = frmInfo.controls.email.valid;
		status.isPassValid = frmInfo.controls.password.valid;
		if (this.infoForm.valid) {
		  this.router.navigate(['displaySubmit', this.infoForm.value]);
		}
	}
}

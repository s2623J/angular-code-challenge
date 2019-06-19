import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	clearForm: false
}

@Component({
  selector: 'app-dialog',
	template: `
    <h1>Discarding Changes:</h1>
    <h2>
      Pressing "OK" will clear the form.Do you want to proceed?
    </h2>
    <div>
      <button mat-button (click)="onClick(true)" id="btnOK">OK</button>
      <button mat-button (click)="onClick(false)" id="btnCancel">Cancel</button>
    </div>
  `
})
export class DialogComponent {

  constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	onClick(val: boolean) {
		this.dialogRef.close(val);
	}
}

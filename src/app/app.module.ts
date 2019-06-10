import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { DisplaySubmitComponent } from './display-submit/display-submit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DialogComponent } from './info-form/info-form.component';

const appRoutes: Routes = [
  { path: '', component: InfoFormComponent },
  { path: 'displaySubmit', component: DisplaySubmitComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
		InfoFormComponent,
		DisplaySubmitComponent,
		PageNotFoundComponent,
		DialogComponent
  ],
  imports: [
		RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AppRoutingModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatButtonModule,
		BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';

import { DisplaySubmitComponent } from './display-submit.component';
import { InfoFormComponent } from './../info-form/info-form.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';


describe('DisplaySubmitComponent', () => {
  let component: DisplaySubmitComponent;
  let fixture: ComponentFixture<DisplaySubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [ RouterTestingModule.withRoutes([
				  { path: '', component: InfoFormComponent },
				  { path: 'displaySubmit', component: DisplaySubmitComponent },
				  { path: '**', component: PageNotFoundComponent }
				]),
				ReactiveFormsModule
			],
      declarations: [
				DisplaySubmitComponent,
				InfoFormComponent,
				PageNotFoundComponent
			]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

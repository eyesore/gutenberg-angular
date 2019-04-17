import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GutenbergAngularComponent } from './gutenberg-angular.component';

describe('GutenbergAngularComponent', () => {
  let component: GutenbergAngularComponent;
  let fixture: ComponentFixture<GutenbergAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GutenbergAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbergAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
